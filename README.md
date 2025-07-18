# Architecture
- GameBoard.tsx is used to display everything and displays the state of Board.ts
- Board.ts implements Game logic and handles moves
- There is a Piece interface which all Pieces implement.
- Each Piece handles individual move logic
- Board handles a lot of King Logic which could be improved

# Features
- All Pieces move according to rules
- Pieces can capture enemy pieces
- Legal moves are displayed
- Pieces cannot move when pinned to King
- King cannot move to Squares which are attacked
- Detection for Checkmate and Stalemate.
- Castling with check if one of castle squares is attacked
- Pawn promotes to queen
- Support for both dark and white mode
- Support Rotating Field

# Missing Features
- User cannot choose a piece when promoting a pawn. Instead always gets a Queen
- En passant not implemented
- No visualisation of captured pieces
- No logic to check if checkmate is theoretically possible
- Not possible to go one move back, pieces already track past positions internally

# Potential Further Development
- Implement Missing Features
- Save Game State so field doesn't gets reset when reloading
- Add Support pieces can also be moved with Rest API
- This would allow implementing multiplayer
- This would allow creation of chess computer to play against
