export default function GameFooter() {
    return (
        <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Playerdle - A daily football player guessing game
            </p>
            </div>
        </footer>
    )
}