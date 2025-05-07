import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideAnimation = trigger('slideIn', [
  // state('*', style({ 'overflow-y': 'hidden' })),
  // state('void', style({ 'overflow-y': 'hidden' })),
  transition('* => void', [
    style({ height: '*' }),
    animate(300, style({ height: 0}))
  ]),
  transition('void => *', [
    style({ height: '0' }),
    animate(300, style({ height: '*' }))
  ])
]);

