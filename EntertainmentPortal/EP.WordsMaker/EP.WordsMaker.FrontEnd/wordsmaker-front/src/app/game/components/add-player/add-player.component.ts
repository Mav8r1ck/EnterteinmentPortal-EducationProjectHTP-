import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import { PlayerService } from '../../services/player.service';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  playerGroup: FormGroup;
  input_class: 'something';

  constructor(private playerService: PlayerService, private fb: FormBuilder) {
    this.playerGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    this.playerService.addPlayer(form.value).
    subscribe( r => console.log(r));
  }

}
