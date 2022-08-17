const mongoose = require('mongoose');

const Certificate = require('../models/certificate');

exports.get_all_certificates = async (req, res, next) => {
	try {
		const certificate = await Certificate.find()
			.select('_id title artist year certificateImage')
			.exec();
		return res.send(certificate);
	} catch (err) {
		res.status(500).json({
			error: err,
		});
	}
};

exports.create_new_certificate = (req, res, next) => {
	const data = req.body
	const certificate = new Certificate({
		_id: new mongoose.Types.ObjectId(),
		title: data.title,
		artist: data.artist,
		year: data.year,
		certificateImage : data.image
	});

	certificate
		.save()
		.then((result) => {
			res.status(201).json({
				message: 'Created certificate successfully',
				createdCertificate: {
					_id: result._id,
					title: result.title,
					artist: result.artist,
					year: result.year,
					certificateImage: result.certificateImage,
				},
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

exports.certificate_delete = (req, res, next) => {
	const id = req.params.certificateId;
	Certificate.remove({ _id: id })
		.exec()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

exports.update_certificate = (req, res, next) => {
	const id = req.params.certificateId;

	Certificate.updateMany({ _id: id }, { $set: req.body })
		.exec()
		.then((result) => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
