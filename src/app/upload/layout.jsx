import LayoutUploadMenu from '@/components/layoutUploadMenu/layoutUploadMenu';
import './upload.css'

export default function UploadLayout({ children }) {
    return (
        <div className="container2">
            <LayoutUploadMenu />
            {children}
        </div>
    );
}
