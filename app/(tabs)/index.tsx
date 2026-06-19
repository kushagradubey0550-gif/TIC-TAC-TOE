import { Platform, StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native';
import { useState, useRef } from 'react';


const Cell = ({ value, onPress }: { value: string, onPress: () => void }) => {
  return (
    <View style={styles.cell}>
      <TouchableOpacity style={styles.cell} onPress={onPress}>
        <Text style={styles.cellText}>{value}</Text>
      </TouchableOpacity>
    </View>
  )
}



export default function HomeScreen() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const [winner, setWinner] = useState('');
  const [showWinner, setShowWinner] = useState(false);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner('');
    setShowWinner(false);
    slideAnim.setValue(-200);
  };
  const handlePress = (index: number) => {
    if (board[index] != '') {
      return;
    }
    else {
      const newBoard = [...board]
      newBoard[index] = currentPlayer
      setBoard(newBoard)
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
          setWinner(newBoard[a]);
          setShowWinner(true);

          Animated.spring(slideAnim, {
            toValue: 60,
            useNativeDriver: false,
          }).start();
          return;
        }
        if (!newBoard.includes('')) {
            setWinner('Draw');
            setShowWinner(true);
          Animated.spring(slideAnim, {
            toValue: 60,
            useNativeDriver: false,
          }).start();
          // resetGame();
          // return;
        }

      }
    }
  };
  const slideAnim = useRef( 
  new Animated.Value(-200)
  ).current;

  


  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      {showWinner && (
       <Animated.View
        style={[
        styles.winnerBanner,
        { top: slideAnim }
       ]}
       >
       <Text style={styles.winnerText}>
        {winner === 'Draw'
          ? "🤝 It's a Draw!"
          : `🎉 Player ${winner} Wins!`}
       </Text>

        <TouchableOpacity
        style={styles.playAgainBtn}
        onPress={() => {
            resetGame();
            setWinner('');
            setShowWinner(false);
            slideAnim.setValue(-200);
          }}
        >
          <Text style={styles.playAgainText}>
            Play Again
          </Text>
        </TouchableOpacity>
      </Animated.View>
      )}
      <View style={styles.board}>

        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onPress={() => handlePress(index)}
          />
        ))}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetGame}
        >
          <Text style={styles.resetButtonText}>Restart Game</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.turnText}>
        Current Turn: {currentPlayer}
      </Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },

  board: {
    width: 330,
    height: 330,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 6,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  cell: {
    width: 100,
    height: 100,
    margin: 3,
    backgroundColor: '#2C2C2C',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  cellText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },

  turnText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 100,
  },
  resetButton: {
    marginTop: 25,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  winnerBanner: {
  position: 'absolute',
  top: 60,
  width: '90%',
  backgroundColor: '#1E1E1E',
  padding: 20,
  borderRadius: 16,
  alignItems: 'center',
  elevation: 10,
  zIndex: 100,
},

winnerText: {
  color: '#fff',
  fontSize: 24,
  fontWeight: 'bold',
},

playAgainBtn: {
  marginTop: 15,
  backgroundColor: '#4CAF50',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 8,
},

playAgainText: {
  color: '#fff',
  fontWeight: 'bold',
},
});