const express = require('express');
const router = express.Router();

const upload = require('../upload');

const CertificateController = require('../controllers/certificate');

router.get('/', CertificateController.get_all_certificates);

router.post(
	'/add-certificate',
	upload.single('image'),
	CertificateController.create_new_certificate
);

router.delete('/:certificateId', CertificateController.certificate_delete);

router.patch('/:certificateId', CertificateController.update_certificate);

module.exports = router;
