//
//
// S.gun.get('root').once(console.log);
// // gun.get('root').get('where').put('here');
//
// ;(() => {
//     S.route = location.hash.slice(1);
//     $('#up').on('click', (e) => {
//         let form = check();
//         if(!form){ return }
//         // $("#up").addClass('pulse'); // 리플효과
//         S.user.create(form.alias, form.pass, (ack) => {
//             // if(!ack.wait){ $("#up").removeClass('pulse') }
//             if(ack.err){ return S.tell(ack.err) }
//             check.up = true;
//             S.user.auth(form.alias, form.pass);
//         });
//     });
//     $('#in').on('submit', (e) => {
//         let form = check();
//         if(!form){ return }
//         // $("#in").addClass('pulse');
//         S.user.auth(form.alias, form.pass, (ack) => {
//             // if(!ack.wait){ $("#in").removeClass('pulse') }
//             if(ack.err){ return S.tell(ack.err) }
//         });
//     });
//     // $('#pass').on('focus', () => {
//     //     $('#alias').addClass('pow');
//     // });
//     // $('#alias').on('focus', () => {
//     //     $('#alias').removeClass('pow');
//     // });
//     $.as.route.page('sign', () => {
//         if(!$('#alias').val()){
//             setTimeout(() => { $('#alias').focus() },1);
//         }
//     });
//     var check = () => {
//         let form = {alias: ($('#alias').val()||'').toLowerCase(), pass: $("#pass").val()||''};
//         if(6 > form.alias.length){
//             S.tell("Your username needs to be longer than 5 letters.");
//             return;
//         }
//         if(9 > form.pass.length){
//             S.tell("Your passphrase needs to be longer than 9 letters.");
//             return;
//         }
//         return form;
//     }
//     S.gun.on('auth', (ack) => {
//         if('hi' === S.route){ S.route = '' }
//         if('sign' === S.route){ S.route = '' }
//         if(check.up){ S.route = 'settings' }
//         $.as.route(S.route = S.route || 'draft');
//     });
//     S.user.recall({sessionStorage: 1});
// })();
