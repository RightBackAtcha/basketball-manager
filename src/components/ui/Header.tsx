// Custom next.js header

import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <>
            <div style={{
                position: "sticky",
                display: 'flex',
                flexDirection: 'row',
                top: 0,
                paddingLeft: '14px',
                paddingTop: '10px',
                paddingBottom: '5px',
                margin: 0,
                backgroundColor: '#0e0e0e',
                color: '#0e0e0e',
            }}>
                <div>
                    <Link href="/" style={{
                        textDecoration: 'none',
                        paddingRight: '5px',
                    }}>
                        <Image src={'/img/ball-white.png'} alt='Home' width={40} height={40}/>
                    </Link>
                </div>
                <div style={{
                    marginLeft: '10px',
                    marginTop: '-15px',
                    marginBottom: '-5px',
                    width: '5px',
                    height: '65px',
                    backgroundColor: 'black'
                }}></div>
                <div style={{
                    paddingLeft: '20px',
                    marginTop: '-20px'
                }}>
                    <Link href="/generation" style={{
                        textDecoration: 'none',
                        color: '#FFFFFF',
                    }}>
                        <p style={{
                            fontSize: '25px',
                            marginBottom: '-5px',
                        }}>
                            Generator
                        </p>
                    </Link>
                </div>
                <div style={{
                    marginLeft: '10px',
                    marginTop: '-15px',
                    marginBottom: '-5px',
                    width: '5px',
                    height: '65px',
                    backgroundColor: 'black'
                }}></div>
                <div style={{
                    paddingLeft: '20px',
                    marginTop: '-20px'
                }}>
                    <Link href="/teams" style={{
                        textDecoration: 'none',
                        color: '#FFFFFF',
                    }}>
                        <p style={{
                            fontSize: '25px',
                            marginBottom: '-5px',
                        }}>
                            Teams
                        </p>
                    </Link>
                </div>
            </div>
        </>)
}