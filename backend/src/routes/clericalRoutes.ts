import express from 'express';
import ClericalRecord from '../models/clericalModel';

const clericalRouter = express.Router();

// Route to fetch all clerical records
clericalRouter.get('/', async (req, res) => {
  try {
    console.log('Fetching all clerical records...');
    const records = await ClericalRecord.find();
    console.log('Records fetched:', records);
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching clerical records:', error);
    res.status(500).json({ message: 'Error fetching clerical records', error });
  }
});


// Route to fetch a single clerical record by ID
clericalRouter.get('/:id', async (req, res) => {
  try {
    const record = await ClericalRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    console.error('Error fetching record by ID:', error);
    res.status(500).json({ message: 'Error fetching record', error });
  }
});

export default clericalRouter;
