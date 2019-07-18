import { GameAndCells } from './../../models/gameAndCells';
import { GameService } from './../../services/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../../models/cell';
import { HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  cells: Cell[][] = [];
  selectedCellsId: Array<number> = new Array<number>();
  selectedCells: Cell[] = [];
  selectedLetters = 'Your word: ';
  id: string;
  alphabet: string[] = [];
  currentLetter: string;
  tempLetter: Cell = new Cell();

  constructor(private gameService: GameService, private route: ActivatedRoute,  private router: Router) {
    this.route.params.subscribe( params => this.gameService.getGame(params.gameid));
  }

  ngOnInit() {
    this.gameService.getMap(this.route.snapshot.queryParamMap.get('mapid')).subscribe(p => {
      this.cells = p;
    },
      (err: HttpResponseBase) => {
        return console.log(err.statusText);
      });
    this.id = this.route.snapshot.queryParamMap.get('mapid');
    this.gameService.getAlphabet().subscribe(a => {
      this.alphabet = a;
    },
    (err: HttpResponseBase) => {
      return console.log(err.statusText);
    });
   }

   selectCell(cell: Cell) {
     if (this.currentLetter != null && cell.letter == null && this.tempLetter.letter == null) {
       cell.letter = this.currentLetter;
       this.tempLetter = cell;
       return;
     }
     if (this.currentLetter != null && cell.letter == null && this.tempLetter.letter != null) {
       this.tempLetter.letter = null;
       cell.letter = this.currentLetter;
       return;
     }
     if (cell.checked === true || cell.letter === null) {
       return;
     }
     this.selectedCellsId.push(cell.id);
     this.selectedCells.push(cell);
     this.selectedLetters += cell.letter;
     cell.checked = true;
   }

   onSendClick() {
    const gameAndCells = new GameAndCells();
    gameAndCells.gameId = this.route.snapshot.queryParamMap.get('id');
    gameAndCells.CellsIdFormWord = this.selectedCellsId;
    this.gameService.sendWord(gameAndCells).subscribe(w => {
      console.log(w);
    },
      (err: HttpResponseBase) => {
        return console.log(err.statusText);
      });

    this.onCancelClick();
   }

   onCancelClick() {
    this.selectedCells.forEach(element => {
      element.checked = false;
    });
    this.selectedCellsId = [];
    this.selectedLetters = 'Your word: ';
   }

   selectLetter(letter: string) {
      this.currentLetter = letter;
   }
 }
