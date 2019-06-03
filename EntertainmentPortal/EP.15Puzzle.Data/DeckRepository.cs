﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EP._15Puzzle.Data.Models;

namespace EP._15Puzzle.Data
{
    public static class DeckRepository
    {
        private static List<DeckDb> _decks = new List<DeckDb>()
        {
            new DeckDb()
            {
                Score = 0,
                Tiles = new List<int>() {16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15},
                UserId = 0,
                Victory = false
            }
        };
        public static DeckDb Get(int id)
        {
            return _decks.Find(d => d.UserId == id);
        }

        public static DeckDb Create(DeckDb deck)
        {
            _decks.Add(deck);
            return deck;
        }

        public static DeckDb Update(DeckDb deck)
        {
            var gameDeck = _decks.Find(d => d.UserId == deck.UserId);
            gameDeck.Tiles = deck.Tiles;
            gameDeck.Score = deck.Score;
            gameDeck.Victory = deck.Victory;
            return deck;
        }
        public static void Delete(DeckDb deck)
        {
            _decks.Remove(deck);
        }
        
    }

}
