import { Dispatch, SetStateAction } from 'react';

type Zoom = {
	x: number;
	y: number;
};

type Crop = {
	x: number;
	y: number;
};

type SelectedFile = File | null | undefined;

export interface ImageCropDialogProps {
	imageUrl?: string;
	cropInit?: Zoom | null;
	zoomInit?: number | null;
	aspectInit?: number | null;
	onCancel: () => void;
	setSelectedImage: Dispatch<SetStateAction<SelectedFile>>;
}

export type AspectRatio = {
	value: number;
	text?: string;
};

export interface ImageCropperProps {
	imgFile: File;
	setCroppedImage: Dispatch<SetStateAction<File | null>>;
	setSelectedImage: Dispatch<SetStateAction<File | null>>;
	closeImageCropper: () => void;
	cropper: CropperState | null;
	setCropper: Dispatch<SetStateAction<CropperState | null>>;
}

export interface CropperState {
	crop: Crop;
	zoom: number;
	aspect?: number;
	shape?: CropShape;
}

export type CropShape = 'rect' | 'round';
