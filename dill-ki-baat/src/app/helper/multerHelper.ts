// app/helper/multerHelper.ts
import multer from 'multer';

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/my-uploads'); // Destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original file name
    }
});

// Export the multer upload instance
export const upload = multer({ storage: storage });
