// Custom next.js footer

export default function Footer() {
    return (
      <footer>
          <div style={{
              position: "fixed",
              paddingLeft: '10px',
              display: 'grid',
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0
          }}>
              <p>©{new Date().getFullYear()} Basketball Manager Team</p>
          </div>
      </footer>
    )
}