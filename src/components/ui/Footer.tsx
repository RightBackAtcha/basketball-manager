// Custom next.js footer

export default function Footer() {
    return (
      <footer>
          <div style={{
              position: "absolute",
              paddingLeft: '10px',
              display: 'grid',
              bottom: 0,
              margin: 0
          }}>
              <p>©{new Date().getFullYear()} Basketball Manager Team</p>
          </div>
      </footer>
    )
}