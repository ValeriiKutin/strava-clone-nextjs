'use client'
import './home.css'
import Activities from "@/components/activities/Activities";
import Container from "@/components/container/Container";
import LeftsideMenu from '@/components/leftside-menu/Leftside-menu';

export default function Home() {
    return (
        <Container>
            <div className="box-home">
                <LeftsideMenu />
                <Activities />
            </div>
        </Container>
    );
}
