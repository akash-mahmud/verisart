const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype.includes('jpeg') ||
		file.mimetype.includes('png') ||
		file.mimetype.includes('jpg')
	) {
		cb(null, true);
	} else {
		cb(null, false);
		return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
	}
};

let upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
