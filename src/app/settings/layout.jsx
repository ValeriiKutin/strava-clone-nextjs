import LayoutLeftSettingsMenu from '@/components/layoutLeftSettingsMenu/layoutLeftSettingsMenu';
import './settings.css'

export default function SettingsLayout({ children }) {
    return (
        <div className="container2">
            <LayoutLeftSettingsMenu />
            
            {children}
        </div>
    );
}
