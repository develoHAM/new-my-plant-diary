import { atom, selector, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { post } from '../data/constants/types/post';
import { LoginState, UserInfoState } from '../data/constants/types/context';

const { persistAtom } = recoilPersist();

export const loginState = atom<LoginState>({
	key: 'loginState',
	default: false,
});

export const userInfoState = atom<UserInfoState>({
	key: 'userInfoState',
	default: {},
});

export const axiosUploadingProgressState = atom({
	key: 'axiosUploadingProgressState',
	default: {
		isLoading: false,
		percentage: 0,
	},
});

export const userPostsState = atom<post[]>({
	key: 'userPostsState',
	default: [],
});

export const filteredUserPostsState = selectorFamily<post[], string>({
	key: 'filteredUserPostsState',
	get:
		(date) =>
		({ get }) => {
			return get(userPostsState)?.filter((post) => post.date === date);
		},
});

export const dateArrayFromUserPostsState = selector({
	key: 'dateArrayFromUserPostsState',
	get: ({ get }) => {
		const arrayOfDates = get(userPostsState).map((post) => post.date);
		return [...new Set(arrayOfDates)];
	},
});
