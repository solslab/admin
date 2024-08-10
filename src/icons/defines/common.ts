import {
	mdiAlertCircle,
	mdiAlertCircleOutline,
	mdiAllInclusiveBox,
	mdiApplicationCog,
	mdiArrowDown,
	mdiArrowLeft,
	mdiArrowRight,
	mdiArrowRightThick,
	mdiArrowUp,
	mdiBugCheck,
	mdiCached,
	mdiCameraIris,
	mdiCastVariant,
	mdiChartBox,
	mdiChartTimelineVariantShimmer,
	mdiCheckBold,
	mdiCheckCircle,
	mdiCheckboxBlankOutline,
	mdiCheckboxMarked,
	mdiCheckboxOutline,
	mdiChevronDown,
	mdiChevronLeft,
	mdiChevronRight,
	mdiChevronUp,
	mdiCircleOutline,
	mdiCircleSmall,
	mdiClose,
	mdiCloseCircle,
	mdiCloseThick,
	mdiCodeBraces,
	mdiCodeBracesBox,
	mdiCodeBrackets,
	mdiCompare,
	mdiCompareHorizontal,
	mdiCubeScan,
	mdiDetails,
	mdiDotsHorizontal,
	mdiDownload,
	mdiEarth,
	mdiEye,
	mdiFilter,
	mdiFilterOff,
	mdiFilterVariant,
	mdiGithub,
	mdiHome,
	mdiHours24,
	mdiInformation,
	mdiInformationBox,
	mdiInformationVariantCircle,
	mdiInformationVariantCircleOutline,
	mdiKeyboardReturn,
	mdiLoading,
	mdiLock,
	mdiLockCheck,
	mdiMagnify,
	mdiMenuRight,
	mdiMinus,
	mdiMinusBoxOutline,
	mdiNetwork,
	mdiPlus,
	mdiQrcode,
	mdiRectangle,
	mdiSendCheck,
	mdiShieldCheck,
	mdiSwapHorizontalBold,
	mdiThumbDown,
	mdiThumbUp,
	mdiUpload,
	mdiViewDashboard,
	mdiWallet,
	mdiWeb,
} from '@mdi/js';
import { IconProp, IconPropType } from '@src/util/icon';

export namespace __Common {
	export const All = {
		type: IconPropType.PATH,
		src: mdiAllInclusiveBox,
	};
	export const NFT = {
		type: IconPropType.PATH,
		src: mdiCubeScan,
	};
	export const Wallet = {
		type: IconPropType.PATH,
		src: mdiWallet,
	};
	export const Dashboard = {
		type: IconPropType.PATH,
		src: mdiViewDashboard,
	};
	export const SendCheck = {
		type: IconPropType.PATH,
		src: mdiSendCheck,
	};
	export const Time24 = {
		type: IconPropType.PATH,
		src: mdiHours24,
	};

	export const Debug = {
		type: IconPropType.PATH,
		src: mdiBugCheck,
	};

	export const Ellipsis = {
		type: IconPropType.PATH,
		src: mdiDotsHorizontal,
	};

	export const Global = {
		type: IconPropType.PATH,
		src: mdiEarth,
	};
	export const Add = {
		type: IconPropType.PATH,
		src: mdiPlus,
	};
	export const Perps = {
		type: IconPropType.PATH,
		src: mdiChartTimelineVariantShimmer,
	};
	export const Server = {
		type: IconPropType.PATH,
		src: mdiNetwork,
	};

	export const Home = {
		type: IconPropType.PATH,
		src: mdiHome,
	};
	export const Sync = {
		type: IconPropType.PATH,
		src: mdiCached,
	};
	export const Search = {
		type: IconPropType.PATH,
		src: mdiMagnify,
	};
	export const RawJson = {
		type: IconPropType.PATH,
		src: mdiCodeBracesBox,
	} as IconProp;
	export const Contract = {
		type: IconPropType.PATH,
		src: mdiApplicationCog,
	};
	export const RawJsonFlat = {
		type: IconPropType.PATH,
		src: mdiCodeBraces,
	} as IconProp;

	export const Code = {
		type: IconPropType.PATH,
		src: mdiCodeBrackets,
	};

	export const Rect = {
		type: IconPropType.PATH,
		src: mdiRectangle,
	};
	export const Loading = {
		type: IconPropType.PATH,
		src: mdiLoading,
	};
	export const Compare = {
		type: IconPropType.PATH,
		src: mdiCompare,
	};
	export const GoToInhouse = {
		type: IconPropType.PATH,
		src: mdiChevronRight,
	} as IconProp;

	export const Preview = {
		type: IconPropType.PATH,
		src: mdiEye,
	};
	export const Switcher = {
		type: IconPropType.PATH,
		src: mdiSwapHorizontalBold,
	};

	export const Iris = {
		type: IconPropType.PATH,
		src: mdiCameraIris,
	} as IconProp;

	export const WebSite = {
		type: IconPropType.PATH,
		src: mdiWeb,
	} as IconProp;

	export const DotInnter = {
		type: IconPropType.PATH,
		src: mdiCircleSmall,
	};
	export const Dot = {
		type: IconPropType.PATH,
		src: mdiCircleOutline,
	};
	export const Github = {
		type: IconPropType.PATH,
		src: mdiGithub,
	};

	export const Modal = {
		type: IconPropType.PATH,
		src: mdiCastVariant,
	};

	export const More = {
		type: IconPropType.PATH,
		src: mdiArrowRightThick,
	};

	export const QRCode = {
		type: IconPropType.PATH,
		src: mdiQrcode,
	};

	export const Back = {
		type: IconPropType.PATH,
		src: mdiChevronLeft,
	};

	export const Warn = {
		type: IconPropType.PATH,
		src: mdiAlertCircle,
	};
	export const WarnOutline = {
		type: IconPropType.PATH,
		src: mdiAlertCircleOutline,
	};
	export const Close = {
		type: IconPropType.PATH,
		src: mdiClose,
	};
	export const CloseBold = {
		type: IconPropType.PATH,
		src: mdiCloseThick,
	};

	export const Explorer = {
		type: IconPropType.PATH,
		src: mdiDetails,
	};

	export const Success = {
		type: IconPropType.PATH,
		src: mdiCheckCircle,
	};
	export const Check = {
		type: IconPropType.PATH,
		src: mdiCheckBold,
	};

	export const Error = {
		type: IconPropType.PATH,
		src: mdiCloseCircle,
	};

	export const CloseCircle = {
		type: IconPropType.PATH,
		src: mdiCloseCircle,
	};
	export const Minus = {
		type: IconPropType.PATH,
		src: mdiMinus,
	};
	export const Next = {
		type: IconPropType.PATH,
		src: mdiChevronRight,
	};
	export const Prev = {
		type: IconPropType.PATH,
		src: mdiChevronLeft,
	};

	export const ThumbsUp = {
		type: IconPropType.PATH,
		src: mdiThumbUp,
	};
	export const ThumbsDown = {
		type: IconPropType.PATH,
		src: mdiThumbDown,
	};

	export const Verified = {
		type: IconPropType.PATH,
		src: mdiShieldCheck,
	};

	export const Info = {
		type: IconPropType.PATH,
		src: mdiInformationBox,
	};

	export const InfoCircle = {
		type: IconPropType.PATH,
		src: mdiInformation,
	};
	export const Upload = {
		type: IconPropType.PATH,
		src: mdiUpload,
	};
	export const InfoVariant = {
		type: IconPropType.PATH,
		src: mdiInformationVariantCircleOutline,
	};

	export const InfoVariantWord = {
		type: IconPropType.PATH,
		src: mdiInformationVariantCircle,
	};

	export const Download = {
		type: IconPropType.PATH,
		src: mdiDownload,
	};

	export const DownCheveron = {
		type: IconPropType.PATH,
		src: mdiChevronDown,
	};
	export const UpCheveron = {
		type: IconPropType.PATH,
		src: mdiChevronUp,
	};
	export const RightCheveron = {
		type: IconPropType.PATH,
		src: mdiChevronRight,
	};
	export const LeftCheveron = {
		type: IconPropType.PATH,
		src: mdiChevronLeft,
	};

	export const Lock = {
		type: IconPropType.PATH,
		src: mdiLock,
	};

	export const LockCheck = {
		type: IconPropType.PATH,
		src: mdiLockCheck,
	};
	export const CheckCircle = {
		type: IconPropType.PATH,
		src: mdiCheckCircle,
	};

	export const CheckBoxEmpty = {
		type: IconPropType.PATH,
		src: mdiCheckboxBlankOutline,
	};
	export const CheckBoxMinus = {
		type: IconPropType.PATH,
		src: mdiMinusBoxOutline,
	};
	export const CheckBoxChecked = {
		type: IconPropType.PATH,
		src: mdiCheckboxOutline,
	};
	export const CheckBoxCheckedFill = {
		type: IconPropType.PATH,
		src: mdiCheckboxMarked,
	};

	export const CaretRight = {
		type: IconPropType.PATH,
		src: mdiMenuRight,
	};

	export const Ethereum = {
		type: IconPropType.IMAGE,
		src: '/assets/chains/_rendered/ethereum.png',
	};

	export const RightArrow = {
		type: IconPropType.PATH,
		src: mdiArrowRight,
	};

	export const LeftArrow = {
		type: IconPropType.PATH,
		src: mdiArrowLeft,
	};
	export const DownArrow = {
		type: IconPropType.PATH,
		src: mdiArrowDown,
	};
	export const UpArrow = {
		type: IconPropType.PATH,
		src: mdiArrowUp,
	};

	export const CompareArrow = {
		type: IconPropType.PATH,
		src: mdiCompareHorizontal,
	};

	export const Report = {
		type: IconPropType.PATH,
		src: mdiChartBox,
	};

	export const FilterVariant = {
		type: IconPropType.PATH,
		src: mdiFilterVariant,
	};

	export const Filter = {
		type: IconPropType.PATH,
		src: mdiFilter,
	};

	export const FilterOff = {
		type: IconPropType.PATH,
		src: mdiFilterOff,
	};

	export const Return = {
		type: IconPropType.PATH,
		src: mdiKeyboardReturn,
	};
}
