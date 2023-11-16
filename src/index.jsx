import Sections from "./Sections";
export { default as Section } from './Section';

export const Capitalize = ({ str }) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export default Sections;
