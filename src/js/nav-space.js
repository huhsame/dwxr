;(() => {
    jq('.navbar-brand').attr('href', location.origin);

    jq('#title').on('click', function(){
        let input = document.createElement('input');
        input.setAttribute('value', this.textContent);
        this.replaceChild(input, this.firstChild);
        this.appendChild( input );
        input.focus();
        input.addEventListener('keyup', function(event){
            if(event.key === 'Enter' ){
                G.space.get('title').put(this.value);
                this.remove();
            }
        })
    });
    jq('#sign-btn').on('click', (e) => {
        let m = jq('#modal-sign');
        m.modal('show')
    });

    jq('#up').on('click', function () {
        let form = check();
        if (!form) {
            return
        }
        S.user.create(form.alias, form.pass, async (ack) => {
            if (ack.err) {
                return S.tell(ack.err)
            }
            check.up = true;
            await S.user.auth(form.alias, form.pass, logined);
        });
    });

    jq('#in').on('click', async function () {
        let form = check();
        if (!form) {
            return
        }
        await S.user.auth(form.alias, form.pass, logined);
    });

    let check = () => {
        let form = {alias: (jq('#alias').val() || '').toLowerCase(), pass: jq("#pass").val() || ''};
        if (6 > form.alias.length) {
            S.tell("Your username needs to be longer than 5 letters.");
            return;
        }
        if (9 > form.pass.length) {
            S.tell("Your passphrase needs to be longer than 9 letters.");
            return;
        }
        return form;
    }

    let logined = (ack) => {
        if (ack.err) {
            return S.tell(ack.err)
        }
        // console.log(ack);
        jq('#modal-sign').modal('hide');
        let e = jq('#sign');
        let alias = S.user.is.alias;
        S.user.recall({sessionStorage: true}); // 세션에 로그인 정보 저장
        location.reload();
        S.tell('welcome, ' + alias + '!');
    }
})();
