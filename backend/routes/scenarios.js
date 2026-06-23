require('dotenv').config();
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { supabase }    = require('../db');
const { requireAuth } = require('./auth');

const router = express.Router();
router.use(requireAuth);

router.post('/', async (req, res) => {
  const { panels, turbines, evs, eventLabel, supply, load, balance, risk, colorState } = req.body;
  if (panels == null || turbines == null || evs == null)
    return res.status(400).json({ error: 'panels, turbines and evs are required' });

  try {
    const scenarioId = uuidv4();
    const { data } = await supabase
      .from('gridguard_scenarios')
      .insert([{
        user_id:     req.user.userId,
        scenario_id: scenarioId,
        panels, turbines, evs,
        event_label: eventLabel || 'Normal day',
        supply:      supply  || 0,
        grid_load:   load    || 0,
        balance:     balance || 0,
        risk:        risk    || 0,
        color_state: colorState || 'green'
      }])
      .select()
      .single();

    res.status(201).json({
      message: 'Scenario saved',
      scenario: { ...data, scenarioId, savedAt: data.saved_at }
    });
  } catch (err) {
    console.error('Save scenario error:', err);
    res.status(500).json({ error: 'Failed to save scenario' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { data: rows } = await supabase
      .from('gridguard_scenarios')
      .select('*')
      .eq('user_id', req.user.userId)
      .order('saved_at', { ascending: false });

    const scenarios = (rows || []).map(s => ({
      scenarioId:  s.scenario_id,
      panels:      s.panels,
      turbines:    s.turbines,
      evs:         s.evs,
      eventLabel:  s.event_label,
      supply:      s.supply,
      load:        s.grid_load,
      balance:     s.balance,
      risk:        s.risk,
      colorState:  s.color_state,
      savedAt:     s.saved_at
    }));

    res.json({ scenarios });
  } catch (err) {
    console.error('Get scenarios error:', err);
    res.status(500).json({ error: 'Failed to retrieve scenarios' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('gridguard_scenarios')
      .delete()
      .eq('scenario_id', req.params.id)
      .eq('user_id', req.user.userId);

    if (error) return res.status(404).json({ error: 'Scenario not found' });
    res.json({ message: 'Scenario deleted' });
  } catch (err) {
    console.error('Delete scenario error:', err);
    res.status(500).json({ error: 'Failed to delete scenario' });
  }
});

module.exports = router;