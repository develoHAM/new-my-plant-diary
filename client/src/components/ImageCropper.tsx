import { useEffect, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { CropShape, ImageCropperProps } from '../data/constants/types/image';
import getCroppedImg from '../utils/cropImage';
import {
	__Background,
	__CropperContainer,
	__ControlsContainer,
	__ZoomSliderContainer,
	__ButtonsContainer,
	__ZoomSlider,
	__Button,
	__Spinner,
} from '../styles/__components/__ImageCropper';

export default function ImageCropper({
	imgFile,
	setSelectedImage,
	setCroppedImage,
	closeImageCropper,
	cropper,
	setCropper,
}: ImageCropperProps) {
	const [loading, setLoading] = useState(false);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [imgURL, setImgURL] = useState<string | null>(null);
	const [croppedArea, setCroppedArea] = useState<Area | null>(null);
	const [aspect, setAspect] = useState(4 / 5);
	const [cropShape, setCropShape] = useState<CropShape>('rect');
	useEffect(() => {
		return () => {
			if (imgURL) {
				URL.revokeObjectURL(imgURL);
			}
		};
	}, [imgURL]);

	useEffect(() => {
		if (imgFile) {
			setImgURL(URL.createObjectURL(imgFile));
		}
		if (cropper) {
			setZoom(cropper.zoom);
			setCrop(cropper.crop);
			if (cropper.shape) {
				setCropShape(cropper.shape);
			}
			if (cropper.aspect) {
				setAspect(cropper.aspect);
			}
		}
	}, [imgFile]);

	const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
		// console.log('percentage', croppedAreaPercentage);
		// console.log('pixels', croppedAreaPixels);
		setCroppedArea(croppedAreaPixels);
	};

	const onCrop = async () => {
		if (croppedArea && imgURL) {
			setLoading(true);
			const imgBlob = await getCroppedImg(imgURL, croppedArea);
			const croppedImageFile = new File([imgBlob], 'image.png', { type: 'image/png' });
			const cropperState = {
				crop: crop,
				zoom: zoom,
				aspect: aspect,
				shape: cropShape,
			};
			setCropper(cropperState);
			setCroppedImage(croppedImageFile);
			setLoading(false);
			closeImageCropper();
		}
	};

	const onCancel = () => {
		setSelectedImage(null);
		closeImageCropper();
	};

	const onReset = () => {
		setZoom(1);
		setCrop({ x: 0, y: 0 });
	};

	return (
		<__Background>
			<__CropperContainer>
				{imgURL && (
					<Cropper
						image={imgURL}
						zoom={zoom}
						crop={crop}
						aspect={aspect}
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={onCropComplete}
						showGrid={false}
						cropShape={cropShape}
					/>
				)}
			</__CropperContainer>
			<__ControlsContainer>
				<__ZoomSliderContainer>
					<__ZoomSlider
						type={'range'}
						min={1}
						max={3}
						value={zoom}
						step={0.001}
						onChange={(e) => {
							setZoom(parseFloat(e.target.value));
						}}
						className={'form-range'}
					/>
				</__ZoomSliderContainer>
				<__ButtonsContainer>
					<__Button onClick={onCancel}>취소</__Button>
					<__Button onClick={onReset}>초기화</__Button>
					<__Button onClick={onCrop} disabled={loading}>
						{loading ? <__Spinner /> : '자르기'}
					</__Button>
				</__ButtonsContainer>
			</__ControlsContainer>
		</__Background>
	);
}
