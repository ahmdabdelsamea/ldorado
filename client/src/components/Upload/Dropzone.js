import { useCallback, useState, useEffect } from 'react';
import { useField } from 'formik';
import { useDropzone } from 'react-dropzone';

import { SingleFileUpload } from './SingleFileUpload';
import { UploadError } from './UploadError';
import './upload.css';

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
};

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: 'border-box',
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden',
	borderRadius: '10px',
};

const img = {
	display: 'block',
	width: 'auto',
	height: '100%',
};

export const Dropzone = ({ name }) => {
	const [, , helpers] = useField(name);

	const [files, setFiles] = useState([]);

	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		const mapAccepted = acceptedFiles.map((file) => ({
			file,
			errors: [],
			preview: URL.createObjectURL(file),
		}));
		setFiles((curr) => [...curr, ...mapAccepted, ...rejectedFiles]);
	}, []);

	useEffect(() => {
		helpers.setValue(files);
		// helpers.setTouched(true);
	}, [files]);

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	const thumbs = files.map((file) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<p>{file.name}</p>
				<img src={file.preview} alt='' style={img} />
			</div>
		</div>
	));

	const onDelete = (file) => {
		setFiles((curr) => curr.filter((fileWrapper) => fileWrapper.file !== file));
	};

	const onUpload = (file, url) => {
		setFiles((curr) =>
			curr.map((fileWrapper) => {
				if (fileWrapper.file === file) {
					return { ...fileWrapper, url };
				}

				return fileWrapper;
			})
		);
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/*',
	});

	return (
		<>
			<div className='drag-area' {...getRootProps()}>
				<input {...getInputProps()} />
				<h3>Drag {`&`} Drop images here, or click to select</h3>
			</div>
			<div style={thumbsContainer}>{thumbs}</div>

			{files.map((fileWrapper, index) => (
				<div>
					{fileWrapper.errors.length ? (
						<UploadError
							file={fileWrapper.file}
							errors={fileWrapper.errors}
							onDelete={onDelete}
						/>
					) : (
						<SingleFileUpload
							key={index}
							file={fileWrapper.file}
							onDelete={onDelete}
							onUpload={onUpload}
						/>
					)}
				</div>
			))}
		</>
	);
};
