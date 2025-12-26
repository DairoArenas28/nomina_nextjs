import { FaBeer, FaHome, FaHeart } from 'react-icons/fa'; // Importa los iconos que necesitas
import { IconType } from 'react-icons'; // IconType es el tipo general para componentes de iconos
import { IoHomeOutline, IoPersonOutline, IoCashOutline, IoDocumentTextOutline, IoExtensionPuzzleOutline, IoSettingsOutline } from 'react-icons/io5';

// Define un tipo para los iconos
interface Iconos {
    [key: string]: IconType; // Un diccionario donde cada clave es un string y el valor es un componente de tipo IconType
}

// Crea un objeto donde almacenes los iconos
const iconos: Iconos = {
    beer: FaBeer,
    home: FaHome,
    homeOutline: IoHomeOutline,
    heart: FaHeart,
    personOutline: IoPersonOutline,
    ioCashOutline: IoCashOutline,
    ioDocumentTextOutline: IoDocumentTextOutline,
    ioExtensionPuzzleOutline: IoExtensionPuzzleOutline,
    ioSettingsOutline: IoSettingsOutline  
};

export default iconos;