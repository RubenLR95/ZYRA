import { Routes } from '@angular/router';
import { ChatComponent } from './features/chat/chat.component';

export const routes: Routes = [       //AQUI VAN TODAS LAS RUTAS. SE CONECTAN UNOS COMPONENTES CON OTROS.
    // RUTA raiz QUE REDIRIGE DIRECTAMENTE A chat
    {path: '', redirectTo: 'chat', pathMatch: 'full'},
    //RUTA CHAT QUE RENDERIZA DIRECTAMENTE CHATCOMPONENT
    {path: 'chat', component: ChatComponent},
    //RUTA COMODÍN QUE REDIRIGE CUALQUIER OTRA RUTA A 'chat'
    { path : '**', redirectTo: 'chat'}
];
