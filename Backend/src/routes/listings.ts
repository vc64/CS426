import express, { Request, Response } from 'express';
import auth from '../middleware/auth';
import Listing from '../models/Listing';
import Reservation from '../models/Reservation';
import { IUser } from '../types/models';

const router = express.Router();

router.get('/', auth, async (req: Request, res: Response) => { // get all listings
  try {
    const listings = await Listing.find()
      .sort({ createdAt: -1 })
      .populate('provider', 'username profileInfo');
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/:foodName', auth, async (req: Request, res: Response) => { // get specific listing
  try {
    const listing = await Listing.findOne({ foodName: req.params.foodName }) // find by food name
      .populate('provider', 'username profileInfo');
    
    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    res.json(listing);
  } catch (err) {
    console.error(err);
    if (err instanceof Error && 'kind' in err && (err as any).kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Listing not found' });
    }
    res.status(500).send('Server error');
  }
});

router.post('/upload', auth, async (req: Request, res: Response) => { // post a listing
  try {
    const currentUser = req.user as IUser;
    
    const {
      foodName,
      restaurantName,
      imageUrl,
      distance,
      pickupTime,
      tags
    } = req.body;

    // Create new listing
    const newListing = new Listing({
      foodName,
      restaurantName,
      imageUrl,
      distance,
      pickupTime,
      tags,
      provider: currentUser._id
    });

    const listing = await newListing.save();
    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.put('/:foodName', auth, async (req: Request, res: Response) => { // edit an existing listing
  try {
    const currentUser = req.user as IUser;
    
    let listing = await Listing.findOne({ foodName: req.params.foodName });
    
    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    // Check if user is the provider
    if (listing.provider.toString() !== currentUser._id.toString()) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update listing
    listing = await Listing.findOneAndUpdate(
      { foodName: req.params.foodName },
      { $set: req.body },
      { new: true }
    );

    res.json(listing);
  } catch (err) {
    console.error(err);
    if (err instanceof Error && 'kind' in err && (err as any).kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Listing not found' });
    }
    res.status(500).send('Server error');
  }
});

router.delete('/:foodName', auth, async (req: Request, res: Response) => { // delete an exisiting listing
  try {
    const currentUser = req.user as IUser;
    
    const listing = await Listing.findOne({ foodName: req.params.foodName });
    
    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    // Check if user is the provider
    if (listing.provider.toString() !== currentUser._id.toString()) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await listing.deleteOne();
    res.json({ msg: 'Listing removed' });
  } catch (err) {
    console.error(err);
    if (err instanceof Error && 'kind' in err && (err as any).kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Listing not found' });
    }
    res.status(500).send('Server error');
  }
});

export default router;