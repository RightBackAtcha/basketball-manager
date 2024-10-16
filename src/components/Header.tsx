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
                paddingLeft: '20px',
                paddingTop: '8px',
                margin: 0,
                backgroundColor: '#291140',
                color: '#f1f1f1',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}>
                <div>
                    <Link href="/">
                        <Image src={'/images/ball.png'} alt='Home Button' width={50} height={50} />
                    </Link>
                </div>
                <div style={{
                    marginLeft: '20px',
                    marginTop: '-8px',
                    width: '5px',
                    height: '66px',
                    backgroundColor: 'black'
                }}></div>
                <div style={{
                    paddingLeft: '20px',
                    marginTop: '-10px'
                }}>
                    <Link href="/generation" style={{
                        textDecoration: 'none',
                        color: '#FFFFFF',

                    }}>
                        <h2>
                        Generator
                        </h2>
                    </Link>
                </div>
            </div>
        </>)
}