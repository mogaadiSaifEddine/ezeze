import {
  trigger,
  animate,
  transition,
  style,
  query,
  state,
} from '@angular/animations';

export const pageFadeAnimation = trigger('pageFadeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('0.3s ease', style({ opacity: 0 })),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate(
          '0.3s ease',
          style({
            opacity: 1,
          })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.3s 0.3s ease', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('0.3s ease', style({ opacity: 0 }))]),
]);
