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
                backgroundColor: '#FF7141',
                color: '#FF7141',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}>
                <div>
                    <Link href="/" style={{
                        textDecoration: 'none',
                        paddingRight: '5px',
                    }}>
                        <Image src={'/images/ball.png'} alt='Home Button' width={40} height={40} />
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
            </div>
        </>)
}