import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '../../../node_modules/@angular/router';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  readonly gameId;
  routingQueryParameters$: Observable<ParamMap>;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {
    this.gameId = this.activatedRoute.snapshot.paramMap.get('gameId');
    this.routingQueryParameters$ = this.activatedRoute.queryParamMap;
  }

  ngOnInit(): void {
  }

}
