import express, { Request, Response } from 'express';
import auth from '../middleware/auth.js';
import Photo from '../models/Photo.js';
import { IUser } from '../types/models.js';

const router = express.Router();

router.get('/', auth, async (req: Request, res: Response) => { // get all photos
  try {
    const photos = await Photo.find()
      .sort({ uploadedAt: -1 })
      .populate('uploadedBy', 'username userType');
    res.json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/:photoId', auth, async (req: Request, res: Response) => { // get specific photo based on ID
  try {
    const photo = await Photo.findById(req.params.photoId) // find by photoId
      .populate('uploadedBy', 'username userType');
    
    if (!photo) {
      return res.status(404).json({ msg: 'Photo not found' });
    }
    res.json(photo);
  } catch (err) {
    console.error(err);
    if (err instanceof Error && 'kind' in err && (err as any).kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Photo not found' });
    }
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req: Request, res: Response) => { // upload a photo
  try {
    const currentUser = req.user as IUser;
    const { url, altText, fileName } = req.body;

    // create new photo
    const newPhoto = new Photo({
      url,
      altText,
      fileName,
      uploadedBy: currentUser._id
    });

    const photo = await newPhoto.save();
    res.json(photo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.put('/:photoId', auth, async (req: Request, res: Response) => { // edit existing photo metadata
  try {
    const currentUser = req.user as IUser;
    let photo = await Photo.findById(req.params.photoId);
    
    if (!photo) {
      return res.status(404).json({ msg: 'Photo not found' });
    }

    // ensure user is also the uploader of the photo
    if (photo.uploadedBy) {
      const photo_uploader = await photo.populate("uploadedBy");
      if (photo_uploader._id != currentUser._id) {
        return res.status(403).send("Not authorized")
      }
    }

    photo.altText = req.body.altText || photo.altText;
    photo.filename = req.body.filename || photo.filename;
    await photo.save();

    res.json(photo);
  } catch (err) {
    console.error(err);
    if (err instanceof Error && 'kind' in err && (err as any).kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Photo not found' });
    }
    res.status(500).send('Server error');
  }
});

router.delete('/:photoId', auth, async (req: Request, res: Response) => { // delete an existing photo
  try {
    const currentUser = req.user as IUser;
    
    const photo = await Photo.findById(req.params.photoId);
    
    if (!photo) {
      return res.status(404).json({ msg: 'Photo not found' });
    }

    // ensure user is also the uploader of the photo
    if (photo.uploadedBy) {
      const photo_uploader = await photo.populate("uploadedBy");
      if (photo_uploader._id != currentUser._id) {
        return res.status(403).send("Not authorized")
      }
    }

    await photo.deleteOne();
    res.json({ msg: 'Photo removed' });
  } catch (err) {
    console.error(err);
    if (err instanceof Error && 'kind' in err && (err as any).kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Photo not found' });
    }
    res.status(500).send('Server error');
  }
});

export default router;