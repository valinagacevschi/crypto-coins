import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../Themes/config.json';

const Icons = createIconSetFromFontello(fontelloConfig);

export const fontello = fontelloConfig;

export default Icons;
