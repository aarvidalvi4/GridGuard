require('dotenv').config();
const express = require('express');
const { supabase }    = require('../db');
const { requireAuth } = require('./auth');

const router = express.Router();
router.use(requireAuth);

router.post('/', async (req, res) => {
  const { monthYear, kwh, sar, people, panels, evs, rate } = req.body;
  if (!monthYear || !kwh || !sar)
    return res.status(400).json({ error: 'monthYear, kwh and sar are required' });

  try {
    await supabase
      .from('gridguard_bills')
      .upsert([{
        user_id:    req.user.userId,
        month_year: monthYear,
        kwh:    Number(kwh),
        sar:    Number(sar),
        people: Number(people) || 1,
        panels: Number(panels) || 0,
        evs:    Number(evs)    || 0,
        rate:   Number(rate)   || 0.18
      }], { onConflict: 'user_id,month_year' });

    res.status(201).json({ message: 'Bill saved' });
  } catch (err) {
    console.error('Save bill error:', err);
    res.status(500).json({ error: 'Failed to save bill' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { data: rows } = await supabase
      .from('gridguard_bills')
      .select('*')
      .eq('user_id', req.user.userId)
      .order('month_year', { ascending: false });

    res.json({ bills: rows || [] });
  } catch (err) {
    console.error('Get bills error:', err);
    res.status(500).json({ error: 'Failed to retrieve bills' });
  }
});

router.get('/:month', async (req, res) => {
  try {
    const { data: bill } = await supabase
      .from('gridguard_bills')
      .select('*')
      .eq('user_id', req.user.userId)
      .eq('month_year', req.params.month)
      .maybeSingle();

    if (!bill)
      return res.status(404).json({ error: 'No bill found for that month' });

    res.json({ bill });
  } catch (err) {
    console.error('Get bill error:', err);
    res.status(500).json({ error: 'Failed to retrieve bill' });
  }
});

module.exports = router;