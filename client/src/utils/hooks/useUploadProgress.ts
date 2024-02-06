import { useRecoilState } from 'recoil';
import { axiosUploadingProgressState } from '../state';

export const useUploadProgress = () => {
	const [uploadProgress, setUploadProgress] = useRecoilState(axiosUploadingProgressState);

	const handleUploadProgress = (progressEvent: ProgressEvent<EventTarget>) => {
		const { loaded, total } = progressEvent;
		if (total) {
			const percentage = Math.floor((loaded * 100) / total);

			// Update Recoil state with the upload progress
			setUploadProgress({ isLoading: true, percentage });
		}
		return { uploadProgress, handleUploadProgress };
	};
};
