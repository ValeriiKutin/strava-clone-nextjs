import LayoutUploadMenu from '@/components/layoutUploadMenu/layoutUploadMenu';
import './upload.css'
import Container from '@/components/container/Container';

export default function UploadLayout({ children }) {
    return (
        <Container>
            <div className="layoutBox">
                <LayoutUploadMenu />
                {children}
            </div>
        </Container>

    );
}
