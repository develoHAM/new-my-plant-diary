export const dataURLtoFile = (dataurl: string, filename: string): File => {
	const arr = dataurl.split(',');
	const mime = arr[0].match(/:(.*?);/)?.[1] || '';
	const bstr = atob(arr[1]);
	const n = bstr.length;
	const u8arr = new Uint8Array(n);

	for (let i = 0; i < n; i++) {
		u8arr[i] = bstr.charCodeAt(i);
	}

	return new File([u8arr], filename, { type: mime });
};
