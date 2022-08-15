// �ㅽ겕濡ㅻ컮�� �붿옄�몄쓣 �낇엳湲� �꾪븳 ��泥� �ㅽ겕由쏀듃
// Alternate script for scrollbar design
// http://www.psyonline.kr/1330044766


var fakescroll=function(){


    var fs={};
    
    //�꾩껜 �ㅽ겕濡ㅻ컮�� �곸슜�섎뒗 怨듯넻 湲곕낯 �듭뀡
    //animate, useswipe, tag瑜� �쒖쇅�� �듭뀡�� x, y瑜� 援щ텇�댁꽌 �곕줈 �ъ슜媛���
    fs.defaultoption={
    
        //track, arrow�� mousedown�� ��, �먮뒗 wheel�� �ъ슜�� �� �곸슜�섎뒗 �� 踰덉뿉 �대룞�섎뒗 �ш린(�レ옄).
        scrollsize : 100,
    
        //�대룞 �섎뒗 �ш린瑜� 二쇱뼱吏� 媛믪뿉 留욊쾶 議곗젅(�レ옄, �ъ슜�섏� �딆쓣 寃쎌슦 0).<br />
        //�� �듭뀡�� �ъ슜�� 寃쎌슦 �대깽�� �⑥닔�먯꽌 pageLeft, pageTop, totalPageLeft, totalPageTop媛� �띿꽦�� �ъ슜�� �� �덉쓬.
        scrollsizefix : 0,
    
        //bar�ъ슜�� �쒖쇅�섍퀬, �ㅽ겕濡� �� �� �대룞 �섎뒗 �ш린瑜� 怨좎젙�� 寃껋씤吏� �щ�(true �먮뒗 false).
        //scrollsizefix媛믪씠 吏��뺣릺�� �덉� �딆쑝硫� scrollsize媛믪쑝濡� 吏��뺣릺怨�, scrollsizefix媛믪씠 吏��뺣릺�� �덉쑝硫� �대떦 媛믪쑝濡� scrollsize媛믪쓣 蹂�寃쏀븿.
        //�� �듭뀡�� �ъ슜�� 寃쎌슦 �대깽�� �⑥닔�먯꽌 pageLeft, pageTop, totalPageLeft, totalPageTop媛� �띿꽦�� �ъ슜�� �� �덉쓬.
        //hide�듭뀡�� 二쇨퀬, �대깽�몄� �④퍡 carousel �뺤떇�� �붾㈃�� 援ы쁽 媛���.
        scrollsizelock : false,
    
        //arrow瑜� �ы븿�� track�� 湲몄씠
        //�ъ슜�섏� �딆쓣 寃쎌슦(0), target �먮뒗 outsidetrack�듭뀡�쇰줈 二쇱뼱吏�, track�� parent媛� �섎뒗 �섎━癒쇳듃�� client(�대�) �ш린濡� 吏��뺣맖.
        //怨좎젙�� 寃쎌슦�먮뒗 �レ옄濡� 吏���.
        //'+', '-' �� �④퍡 臾몄옄濡� 吏��뺥븷 寃쎌슦(ex: '-20', '+40'), target �먮뒗 outsidetrack�듭뀡�쇰줈 二쇱뼱吏�, track�� parent媛� �섎뒗 �섎━癒쇳듃�� client(�대�) �ш린�� ���� �곷��곸쑝濡� 吏��뺣맖.
        //怨좎젙(�レ옄)�� �꾨땲怨�, x/y track�� parent媛� 媛숆퀬, x/y �ㅽ겕濡ㅼ씠 紐⑤몢 �앷만 寃쎌슦, 媛곴컖 �쒕줈�� �볦씠 �먮뒗 �믪씠 留뚰겮 湲몄씠媛� 以꾩뼱�ㅺ퀬 scrollbar.neutralzone �� display:block ��.
        tracksize : 0,
    
        //track�� target �몃��먯꽌 �ъ슜�� 寃쎌슦 吏���(�섎━癒쇳듃 �먯껜 �먮뒗 id(臾몄옄))
        outsidetrack : null,
    
        //bar�� 湲몄씠(�レ옄(怨좎젙) �먮뒗 'auto'(鍮꾩쑉�� 留욎땄)).
        barsize : 'auto',
    
        //bar�� 理쒖냼 湲몄씠(�レ옄)
        barminsize : 20,
    
        //track�� �ｌ쓣 html(臾몄옄). CSS留뚯쑝濡쒕뒗 �닿껐�� �덈맆 ��. �뗣뀑
        trackhtml : '',
    
        //bar�� �ｌ쓣 html(臾몄옄). �닿쾬�� CSS留뚯쑝濡쒕뒗 �닿껐�� �덈맆 ��.
        barhtml : '',
    
        //�좊땲留ㅼ씠�� �④낵 �ъ슜 �щ�(true �먮뒗 false).
        //swipe�먯꽌�� animation�� 愿��� �놁쓬.
        animate : true,
    
        //track�� �쒖떆�섏� �딆쓣 寃껋씤吏� �щ�(true �먮뒗 false).
        //true�� 寃쎌슦 track怨� �덉そ�� bar, arrow 紐⑤몢 �앹꽦�섏� �딆쓬. swipe�� wheel�� �댁슜�� �ㅽ겕濡ㅼ� 媛���.
        hide : false,
    
        //track(bar, arrow �ы븿)�� 而⑦듃濡� 湲곕뒫�� 類� 寃껋씤吏� �щ�(true �먮뒗 false).
        //true�� 寃쎌슦, css pointer-events:none �� 吏��뺥븯湲� �뚮Ц�� 吏��먮릺�� 釉뚮씪�곗��먯꽌�� bar媛� 蹂댁씠�붾씪�� bar 遺�遺꾩뿉�� swipe 媛���.
        nointeract : false,
    
        //而⑦뀗痢� �곸뿭�� swipe(�쒕옒洹�)媛��ν븯寃� �� 寃껋씤吏� �щ�(true �먮뒗 false).
        useswipe : true,
    
        //�ㅽ겕濡� 湲곕뒫�� �ъ슜�섏� �딆쓣 寃껋씤吏� �щ�(true �먮뒗 false).
        //true濡� �ㅼ젙 �� �ㅽ겕濡� 湲곕뒫�� �꾩삁 �놁뼱吏�怨�, x/y 紐⑤몢 disable�� true�� 寃쎌슦 wrapper瑜� �쒓굅�섍퀬 null 諛섑솚(.remove() �ㅽ뻾).
        disable : false,
    
        //x, y �ㅽ겕濡ㅼ씠 �� �댁긽 �ㅽ겕濡� �� 媛믪씠 �녿뒗 寃쎌슦�먮룄 �곸쐞 �섎━癒쇳듃�� �ㅽ겕濡ㅼ쓣 留됱쓣寃껋씤吏� �щ�(true �먮뒗 false).
        //blockparentscroll�� �ъ슜�� 寃쎌슦 �ㅽ겕濡� �� 媛믪씠 �놁뼱�� swipe 媛���. x, y �� �� �놁쓣 寃쎌슦 y媛� �곗꽑.
        blockparentscroll : false,
    
        //�ㅽ겕濡� 諛붾� 留뚮뱶�� �� �ъ슜�� �쒓렇紐�(臾몄옄).
        //吏��뺣맂 �쒓렇媛� block �붿냼媛� �꾨땺 寃쎌슦 css�먯꽌 display:block;�� 異붽�.
        tag : 'div',
    
        //�ㅽ겕濡� �� �� wrapper�� css transform�� �ъ슜�� 寃껋씤吏� �щ�(true �먮뒗 false).
        //吏��먰븯�� 釉뚮씪�곗��먯꽌留� �곸슜 �섍퀬, false�닿굅�� 吏��먮릺吏� �딆쓣 寃쎌슦 wrapper�� margin�� �ъ슜.
        //webkit�먯꽌�� 醫� 蹂묐쭧�댁뼱�� margin ���� 理쒖냼 translate瑜� �ъ슜(true�대㈃ translate3d瑜� �ъ슜).
        //css transform�� �ъ슜�� 寃쎌슦 �섍꼍�� �곕씪 �ㅼ냼 �먮젮吏� �� �덉쓬.
        usetransform : false
    
    };
    
    //�ㅽ겕濡� track, bar, arrow, content�� 吏��뺥븷 css �대옒�� 紐�
    fs.cssclass={
        content : 'scroll-content',
        neutralzone : 'scroll-neutralzone',
        x : ['scroll-track scroll-track-x', 'scroll-bar scroll-bar-x', 'scroll-arrow scroll-arrow-left', 'scroll-arrow scroll-arrow-right', 'scroll-content-x'],
        y : ['scroll-track scroll-track-y', 'scroll-bar scroll-bar-y', 'scroll-arrow scroll-arrow-up', 'scroll-arrow scroll-arrow-down', 'scroll-content-y'],
        iosmode : 'ios'
    };
    
    
    //遺�紐� �섎━癒쇳듃�� �ㅽ겕濡ㅻ컮 �대깽�몃� �댁젣, reset�� �꾪빐 �앹꽦�� �ㅽ겕濡ㅻ컮 �ㅻ툕�앺듃�ㅼ쓣 ����
    fs.items=[];
    
    //�ㅽ겕濡� �앹꽦 �⑥닔
    //parameters : (target �섎━癒쇳듃 �먯껜 �먮뒗 id(臾몄옄), �듭뀡);
    //return �ㅽ겕濡ㅻ컮 �ㅻ툕�앺듃
    fs.set=function(target, option, preset){
    
        var i, j, max, flag, defaultoption=fs.defaultoption, cssclass=fs.cssclass, items=fs.items, handle=fs.handle, create=fs.createtag, fsbar=fs.scrollbar, style=fs.style, findelement=fs.findelement, remove=fs.remove, browser=fs.browser, notdisplayed=false;
    
        //target�� �섎━癒쇳듃�몄� �뺤씤
        target=findelement(target);
    
        //target�� �녾굅�� �섎━癒쇳듃媛� �꾨땶 寃쎌슦 痍⑥냼
        if (!target){
            return null;
        }
    
        //�대� 吏��뺣릺�� �덈뒗 寃쎌슦 remove
        for (i=0, max=items.length; i<max; i++){
            if (items[i] && items[i].target==target){
                items[i]=remove(items[i]);
                break;
            }
        }
    
        //target�� 湲곕낯 scroll 媛믪쓣 珥덇린��
        target.scrollTop=0;
        target.scrollLeft=0;
    
        //target�� 湲곕낯 �ㅽ겕濡ㅻ컮瑜� 媛먯땄
        target.style.overflow='hidden';
    
        //target�� position�� static�� 寃쎌슦 relative濡� 蹂�寃�.
        if (style.get(target, 'position')=='static'){
            style.set(target, 'position', 'relative');
        }
    
        //target�� display媛� none �곹깭�� 寃쎌슦 �꾩떆濡� block.
        if (style.get(target, 'display')=='none'){
            style.set(target, 'display', 'block');
            notdisplayed=true;
        }
    
        option=option || {};
    
        //諛섑솚 �� scroll bar object
        //animate, useswipe, tag, slidermode �띿꽦�� x, y 援щ텇�섏� �딄퀬 怨듯넻�쇰줈 �ъ슜.
        var scrollbar={
            id : items.length,
            target : target,
            animate : (option.animate!=undefined)? option.animate : defaultoption.animate,
            useswipe : (option.useswipe!=undefined)? option.useswipe : defaultoption.useswipe,
            tag : option.tag || defaultoption.tag,
            usetransform : (option.usetransform!=undefined)? option.usetransform : defaultoption.usetransform,
            slidermode : option.slidermode
        };
    
        //�대깽�몃� document�� �곸슜�댁빞�� 寃쎌슦
        //�대떦 scrollbar object瑜� 媛��몄삤湲곌� �좊ℓ�댁꽌 closure濡� �묎렐�댁꽌 �⑥닔 �몄닔濡� �섍린寃�
        scrollbar.handle={
            start : function(e){
                handle.start(scrollbar, this, e);
            },
            end : function(e){
                handle.end(scrollbar, e);
            },
            barmove : function(e){
                handle.barmove(scrollbar, e);
            },
            wheel : function(e){
                handle.wheel(scrollbar, e);
            },
            swipe : function(e){
                handle.swipe(scrollbar, e);
            },
            swipeend : function(e){
                handle.swipeend(scrollbar, e);
            },
            killautoscroll : function(e){
                fs.killautoscroll(scrollbar);
            }
        };
    
        //wrapper�� �곸슜�� css �띿꽦. webkit�� margin�쇰줈 �섎㈃ 醫� 蹂묐쭧�댁뼱�� 理쒖냼 translate濡� 媛뺤젣 吏���
        if (scrollbar.usetransform && browser.support.transform){
            scrollbar.wcp=(browser.support.translate3d)? ['tx3d', 'ty3d'] : ['tx', 'ty'];
        }else{
            scrollbar.wcp=(browser.webkit && browser.support.transform)? ['tx', 'ty'] : ['marginLeft', 'marginTop'];
        }
    
        //wrapper �섎━癒쇳듃 異붽�
        scrollbar.wrapper=create(scrollbar, scrollbar.tag, cssclass.content, 'wrapper');
        var childs=target.childNodes;
        for (i=0, max=childs.length; i<max; i++){
            scrollbar.wrapper.appendChild(childs[i]);
            max--;
            i--;
        }
        target.appendChild(scrollbar.wrapper);
    
        //scrollbar 蹂��섏뿉 �띿꽦 �ㅼ젙 諛� �섎━癒쇳듃 異붽�
        var scroll, arrowflags=['left', 'right', 'up', 'down'];
        for (i=0; i<2; i++){
    
            flag=(!i)? 'x' : 'y';
    
            scrollbar[flag]={};
            option[flag]=option[flag] || {};
    
            //disable�� 寃쎌슦
            if (option.disable || option[flag].disable){
    
                scrollbar[flag].disable=true;
                scrollbar[flag].blockparentscroll=option[flag].blockparentscroll || option.blockparentscroll || defaultoption.blockparentscroll;
    
            //�꾨땺 寃쎌슦 defaultoption�� �대떦�섎뒗 媛믪쓣 scrollbar蹂��섏뿉 異붽�
            }else{
    
                //�⑥닔 �몄닔 option �먮뒗 option�� x, y瑜� �뺤씤�섍퀬 �덉쓣 寃쎌슦 �ъ슜
                //option[flag] > option > defaultoption
                //animate, useswipe, tag�띿꽦�� 怨듯넻�쇰줈 �ъ슜�섍린 �꾪빐 x, y 蹂꾨룄 �듭뀡�먯꽌�� ��젣
                for (j in defaultoption){
                    if (j!='animate' && j!='useswipe' && j!='tag'){
                        scrollbar[flag][j]=option[flag][j] || option[j] || defaultoption[j];
                    }
                }
    
                //�꾩옱媛� 珥덇린��
                scrollbar[flag].now=0;
    
                //�대룞�� 媛� 珥덇린��
                scrollbar[flag].to=0;
    
                //page 珥덇린��
                scrollbar[flag].nowpage=0;
                scrollbar[flag].totalpage=1;
    
                //scrollsizelock�� 嫄몃젮�덉쑝硫� scrollsize�� scrollsizefix瑜� �숈씪�섍쾶 �ㅼ젙
                if (scrollbar[flag].scrollsizelock){
                    if (!scrollbar[flag].scrollsizefix){
                        scrollbar[flag].scrollsizefix=scrollbar[flag].scrollsize;
                    }else{
                        scrollbar[flag].scrollsize=scrollbar[flag].scrollsizefix;
                    }
                }
    
                //hide媛� �꾨땺 寃쎌슦�먮쭔 track, bar, arrow �앹꽦 諛� �띿꽦 �ㅼ젙
                if (!scrollbar[flag].hide){
    
                    //outsidetrack�� �섎━癒쇳듃�몄� �뺤씤
                    scrollbar[flag].outsidetrack=findelement(scrollbar[flag].outsidetrack);
    
                    //tracksizefix�띿꽦�� 異붽��섍퀬 option�� tracksize媛� �덉쓣 寃쎌슦 怨좎젙媛믪씤吏� �곷�媛믪씤吏� �뺤씤
                    scrollbar[flag].tracksizefix=false;
                    if (scrollbar[flag].tracksize){
                        //怨좎젙媛� �뺤씤
                        if (typeof(scrollbar[flag].tracksize)=='number'){
                            scrollbar[flag].tracksizefix=true;
                        }else if (typeof(scrollbar[flag].tracksize)=='string'){
                            //�곷�媛�(+, -)�뺤씤. �뺤떇�� 留욎� �딆쑝硫� 0(�ъ슜�덊븿)�쇰줈 �ㅼ젙
                            if ((/^(\-|\+)[1-9]/).test(scrollbar[flag].tracksize)){
                                scrollbar[flag].tracksize=parseInt(scrollbar[flag].tracksize);
                            }else{
                                scrollbar[flag].tracksize=0;
                            }
                        }
                    }
    
                    //track �앹꽦
                    scrollbar[flag].track=create(scrollbar, scrollbar.tag, cssclass[flag][0], 'track-'+flag, flag);
                    if (scrollbar[flag].trackhtml){
                        scrollbar[flag].track.innerHTML=scrollbar[flag].trackhtml;
                    }
    
                    //no interact �듭뀡�� �덉쑝硫� css pointer events�� 吏���
                    if (scrollbar[flag].nointeract){
                        scrollbar[flag].track.style.pointerEvents='none';
                    }
    
                    //bar �앹꽦 �� track�� append
                    scrollbar[flag].bar=create(scrollbar, scrollbar.tag, cssclass[flag][1], 'bar-'+flag, flag);
                    if (scrollbar[flag].barhtml){
                        scrollbar[flag].bar.innerHTML=scrollbar[flag].barhtml;
                    }
                    scrollbar[flag].track.appendChild(scrollbar[flag].bar);
    
                    //track container �ㅼ젙 �� append. outsidetrack�� 吏��뺣맂 寃쎌슦 outsidetrack�� �ｌ쓬.
                    scrollbar[flag].trackcontainer=scrollbar[flag].outsidetrack || target;
                    scrollbar[flag].trackcontainer.appendChild(scrollbar[flag].track);
    
                    //track container�� position�� static�� 寃쎌슦 relative濡� 蹂�寃�.
                    if (style.get(scrollbar[flag].trackcontainer, 'position')=='static'){
                        style.set(scrollbar[flag].trackcontainer, 'position', 'relative');
                    }
    
                    //arrow �ш린
                    scrollbar[flag].arrowsize=[0, 0];
    
                    //slider紐⑤뱶媛� �꾨땺 寃쎌슦�먮쭔 arrow �앹꽦
                    if (!scrollbar.slidermode){
    
                        //arrow �앹꽦 �� track�� append
                        scrollbar[flag].arrow=[
                            create(scrollbar, scrollbar.tag, cssclass[flag][2], 'arrow-'+arrowflags[i*2], flag),
                            create(scrollbar, scrollbar.tag, cssclass[flag][3], 'arrow-'+arrowflags[i*2+1], flag)
                        ];
                        scrollbar[flag].track.appendChild(scrollbar[flag].arrow[0]);
                        scrollbar[flag].track.appendChild(scrollbar[flag].arrow[1]);
    
                        //arrow[0]�� offsetWidth媛� �놁쓣 寃쎌슦 arrow瑜� �ъ슜�섏� �딅뒗 寃껋쑝濡� 媛꾩＜. arrow�쒓굅
                        if (!scrollbar[flag].arrow[0].offsetWidth){
                            scrollbar[flag].track.removeChild(scrollbar[flag].arrow[0]);
                            scrollbar[flag].track.removeChild(scrollbar[flag].arrow[1]);
                            scrollbar[flag].arrow=null;
                        //�꾨땺寃쎌슦 arrow size 怨꾩궛. arrow�� bar�� 媛꾧꺽�� �ъ슜�섍린 �꾪빐 arrow�� margin�� 吏��뺣맂 寃쎌슦 �대떦 媛믪쓣 �뷀븿.
                        }else{
                            if (flag=='x'){
                                for (j=0; j<2; j++){
                                    scrollbar[flag].arrowsize[j]=scrollbar[flag].arrow[j].offsetWidth
                                        +style.get(scrollbar[flag].arrow[j], 'marginLeft')
                                        +style.get(scrollbar[flag].arrow[j], 'marginRight');
                                }
                            }else{
                                for (j=0; j<2; j++){
                                    scrollbar[flag].arrowsize[j]=scrollbar[flag].arrow[j].offsetHeight
                                        +style.get(scrollbar[flag].arrow[j], 'marginTop')
                                        +style.get(scrollbar[flag].arrow[j], 'marginBottom');
                                }
                            }
                            scrollbar[flag].arrowsize[3]=scrollbar[flag].arrowsize[0]+scrollbar[flag].arrowsize[1];
                        }
    
                    }
    
                    //bar size minus. bar�ш린�먯꽌 類� 媛�(padding, border)
                    if (flag=='x'){
                        scrollbar[flag].bar.style.width=0;
                        scrollbar[flag].bsizem=scrollbar[flag].bar.offsetWidth;
                    }else{
                        scrollbar[flag].bar.style.height=0;
                        scrollbar[flag].bsizem=scrollbar[flag].bar.offsetHeight;
                    }
    
                }
    
            }
    
        }
    
        //x, y 紐⑤몢 disable�대㈃ wrapper�쒓굅�섍퀬 null諛섑솚
        if (scrollbar.x.disable && scrollbar.y.disable){
            return remove(scrollbar);
        }
    
        //x, y 紐⑤몢 hide, disable�� �꾨땲怨�, �몃옓�ъ씠利덇� 怨좎젙�� �꾨땲怨� container媛� 媛숈쑝硫� neutralzone異붽�
        if (!scrollbar.x.hide && !scrollbar.y.hide && !scrollbar.x.disable && !scrollbar.y.disable &&
            !scrollbar.x.tracksizefix && !scrollbar.y.tracksizefix && scrollbar.x.trackcontainer==scrollbar.y.trackcontainer){
            scrollbar.neutralzone=create(scrollbar, scrollbar.tag, cssclass.neutralzone, 'neutralzone');
            scrollbar.x.trackcontainer.appendChild(scrollbar.neutralzone);
        }
    
        //湲고� �꾩슂�� �띿꽦, �⑥닔 ����
        scrollbar.reset=fsbar.reset;
        scrollbar.remove=fsbar.remove;
        scrollbar.scrollTo=fsbar.scrollTo;
        scrollbar.scrollLeft=fsbar.scrollLeft;
        scrollbar.scrollTop=fsbar.scrollTop;
        scrollbar.maxScrollLeft=fsbar.maxScrollLeft;
        scrollbar.maxScrollTop=fsbar.maxScrollTop;
        scrollbar.stop=fsbar.stop;
        scrollbar.cancelSwipe=fsbar.cancelSwipe;
    
        //eventvars. �대깽�몄뿉 �꾩슂�� 蹂��섎뱾�� �ｌ쓣 object, 
        scrollbar.evs={};
    
        //�ㅽ겕濡ㅻ컮�� scroll, scrollstart, scrollend, pagechange, reset �대깽�� �ㅼ젙
        scrollbar.event={
            scrollstart : [],
            scroll : [],
            scrollend : [],
            pagechange : [],
            reset : [],
            add : function(type, callback){
                return fsbar.event.add(scrollbar, type, callback);
            },
            remove : function(type, callback){
                return fsbar.event.remove(scrollbar, type, callback);
            }
        }
        scrollbar.addEventListener=scrollbar.event.add;
        scrollbar.removeEventListener=scrollbar.event.remove;
    
        items.push(scrollbar);
    
        return (preset)? scrollbar : fs.reset(scrollbar, notdisplayed);
    
    }
    
    //scrollbar object�� ���낇븯湲� �꾪븳 �⑥닔��
    fs.scrollbar={
    
        reset : function(){
            return fs.reset(this);
        },
    
        remove : function(){
            return fs.remove(this);
        },
    
        scrollLeft : function(value, noani){
            return fs.scrollLeft(this, value, noani);
        },
    
        scrollTop : function(value, noani){
            return fs.scrollTop(this, value, noani);
        },
    
        scrollTo : function(x, y, noani){
            return fs.scrollTo(this, x, y, noani);
        },
    
        maxScrollLeft : function(){
            return fs.maxScrollLeft(this);
        },
    
        maxScrollTop : function(){
            return fs.maxScrollTop(this);
        },
    
        stop : function(){
            return fs.stop(this, true);
        },
    
        cancelSwipe : function(){
            return fs.cancelSwipe(this);
        },
    
        event : {
            add : function(scrollbar, type, callback){
                type=type.toLowerCase();
                if (scrollbar.event[type]){
                    scrollbar.event[type].push(callback);
                }
                return scrollbar;
            },
            remove : function(scrollbar, type, callback){
                type=type.toLowerCase();
                if (scrollbar.event[type]){
                    for (var i=0, max=scrollbar.event[type].length; i<max; i++){
                        if (scrollbar.event[type][i]==callback){
                            scrollbar.event[type].splice(i, 1);
                            max--;
                            i--;
                        }
                    }
                }
                return scrollbar;
            }
        }
    
    }
    
    //�ъ씠利� �ъ꽕�� ��
    fs.reset=function(scrollbar, notdisplayed){
    
        var target=scrollbar.target, wrapper=scrollbar.wrapper, browser=fs.browser, style=fs.style, classname=fs.classname, event=fs.event, wcp=scrollbar.wcp, cssclass=fs.cssclass, handle=scrollbar.handle;
    
        //scroll 硫덉땄
        fs.stop(scrollbar);
    
        //for ie7 bug : overflow媛� disable�닿굅�� zoom�� �덉쑝硫� scrollWidth, scrollHeight�� �쒕�濡� 紐산��몄샂
        if (browser.ie==7){
            target.style.overflow='visible';
            wrapper.style.zoom=0;
        }
    
        var currentscroll, otherscroll, xscroll=scrollbar.x, yscroll=scrollbar.y, 
            flags=[
            //    0,  1,   2,          3,                 4,                  5
                ['x', 'y', 'width', 'clientWidth', 'offsetWidth', 'scrollWidth'],
                ['y', 'x', 'height', 'clientHeight', 'offsetHeight', 'scrollHeight']
            ];
    
        //�ㅽ겕濡ㅼ씠 �앷린�붿� 癒쇱� 泥댄겕
        for (i=0; i<2; i++){
    
            currentscroll=scrollbar[flags[i][0]];
    
            if (!currentscroll.disable){
    
                //scroll 媛� 珥덇린��
                style.set(wrapper, wcp[i], 0);
    
                //scroll size瑜� �뺥솗�� 怨꾩궛�섍린 �꾪빐 �쇰떒 track�� display none, wrapper�먯꽌 援щ텇 css�대옒�ㅻ� �쒓굅
                if (!currentscroll.hide){
                    currentscroll.track.style.display='none';
                }
                classname.remove(wrapper, cssclass[flags[i][0]][4]);
    
                //target�� client size
                currentscroll.clientsize=target[flags[i][3]];
    
                //contentsize check
                currentscroll.contentsize=Math.max(target[flags[i][5]], wrapper[flags[i][4]]);
    
                //留앺븷 ie7 ��
                if (browser.ie==7 && wrapper.getElementsByTagName('*').length){
                    currentscroll.contentsize=Math.max(currentscroll.contentsize, wrapper.getElementsByTagName('*')[0][flags[i][4]]);
                }
    
                //�ㅽ겕濡ㅻ컮媛� �쒖떆�섎뒗 吏� �щ�
                currentscroll.show=currentscroll.contentsize>currentscroll.clientsize;
    
                //�ㅽ겕濡ㅻ컮媛� �쒖떆�섎㈃ �ㅼ떆 css�대옒�� 異붽�
                if (currentscroll.show && !currentscroll.outsidetrack && !currentscroll.hide){
                    classname.add(wrapper, cssclass[flags[i][0]][4]);
                }
    
            }
    
        }
    
        //x, y 紐⑤몢 show�� 寃쎌슦 newtralzone �쒖떆
        if (scrollbar.neutralzone){
            scrollbar.neutralzone.style.display=(xscroll.show && yscroll.show)? 'block' : 'none';
        }
    
        var barmaxsize, tracksize, nowpage, totalpage, pagechanged=false;
        for (i=0; i<2; i++){
    
            currentscroll=scrollbar[flags[i][0]];
            otherscroll=scrollbar[flags[i][1]];
    
            if (currentscroll.show){
    
                //wrapper�� css媛� 二쇱뼱吏� �� �ㅼ떆 contentsize瑜� 援ы븿
                currentscroll.contentsize=Math.max(target[flags[i][5]], wrapper[flags[i][4]]);
    
                //留앺븷 ie7 ��
                if (browser.ie==7 && wrapper.getElementsByTagName('*').length){
                    currentscroll.contentsize=Math.max(currentscroll.contentsize, wrapper.getElementsByTagName('*')[0][flags[i][4]]);
                }
    
                //媛��ν븳 理쒕� scroll 媛�
                currentscroll.ablesize=currentscroll.clientsize-currentscroll.contentsize;
    
                //�꾩옱媛믪씠 �덉쑝硫� �대떦 媛믪쑝濡� �대룞
                if (currentscroll.now){
                    if (currentscroll.scrollsizefix && currentscroll.nowpage){
                        currentscroll.now=-currentscroll.scrollsizefix*currentscroll.nowpage;
                    }
                    if (currentscroll.ablesize>currentscroll.now){
                        currentscroll.now=currentscroll.ablesize;
                    }
                    style.set(wrapper, wcp[i], currentscroll.now);
                }
                currentscroll.to=currentscroll.now;
    
                //scrollsizefix媛� 吏��뺣릺�댁엳�쇰㈃ nowpage諛� totalpage瑜� �ㅼ젙
                if (currentscroll.scrollsizefix){
                    nowpage=Math.round(-currentscroll.now/currentscroll.scrollsizefix);
                    totalpage=Math.floor(Math.abs(currentscroll.ablesize/currentscroll.scrollsizefix))+1;
                    if (nowpage!=currentscroll.nowpage || totalpage!=currentscroll.totalpage){
                        currentscroll.nowpage=nowpage;
                        currentscroll.totalpage=totalpage;
                        pagechanged=true;
                    }
                }
    
                if (!currentscroll.hide){
    
                    //set track
                    //�몃옓�ъ씠利덇� 怨좎젙�대㈃
                    if (currentscroll.tracksizefix){
                        tracksize=currentscroll.tracksize;
                    //怨좎젙�� �꾨땲硫�
                    }else{
                        //x �쇰븣 y, y�쇰븣 x�� outsidetrack�� �녾굅�� �덈뒗�� �쒕줈 �ㅻⅨ 寃쎌슦 track container�� offset媛믪쑝濡� �ㅼ젙
                        if (currentscroll.outsidetrack && (!otherscroll.outsidetrack || currentscroll.outsidetrack!=otherscroll.outsidetrack)){
                            tracksize=currentscroll.trackcontainer[flags[i][3]];
                        //x �쇰븣 y, y�쇰븣 x媛� �쒖떆�좊븣�� trackcontainer媛� 媛숈� 寃쎌슦 �쒕줈�� offset媛� 留뚰겮 類�
                        }else if (otherscroll.show && currentscroll.trackcontainer==otherscroll.trackcontainer){
                            otherscroll.track.style.display='block';
                            tracksize=currentscroll.trackcontainer[flags[i][3]]-otherscroll.track[flags[i][4]];
                        //�꾨땲硫� 洹몃깷 track container�� offset媛믪쑝濡� �ㅼ젙
                        }else{
                            tracksize=currentscroll.trackcontainer[flags[i][3]];
                        }
                        //tracksize媛� �곷�媛믪씪 寃쎌슦�� 留욊쾶 留덉�留됱쑝濡� tracksize瑜� �뷀븿
                        tracksize+=currentscroll.tracksize;
                    }
                    style.set(currentscroll.track, flags[i][2], Math.max(tracksize, 0));
    
                    //bar�� 理쒕� �ъ씠利�
                    barmaxsize=(currentscroll.arrowsize[0])? tracksize-currentscroll.arrowsize[3] : tracksize;
    
                    //bar�� �ъ씠利�
                    if (currentscroll.barsize=='auto'){
                        currentscroll.bnowsize=Math.max(Math.round(barmaxsize*(currentscroll.clientsize/currentscroll.contentsize)), currentscroll.barminsize);
                    }else{
                        currentscroll.bnowsize=currentscroll.barsize;
                    }
                    currentscroll.bnowsize-=currentscroll.bsizem;
                    style.set(currentscroll.bar, flags[i][2], currentscroll.bnowsize);
    
                    //bar�� 理쒖냼, 理쒕� �꾩튂
                    currentscroll.bminpos=currentscroll.arrowsize[0];
                    currentscroll.bmaxpos=currentscroll.bminpos+barmaxsize-currentscroll.bnowsize-currentscroll.bsizem;
    
                    //bar �대룞
                    fs.movebar(scrollbar, flags[i][0], currentscroll.now);
    
                    //track�� �ㅼ떆 蹂댁씠寃�
                    currentscroll.track.style.display='block';
    
                }
    
            }else{
    
                currentscroll.now=0;
                currentscroll.ablesize=0;
    
            }
    
        }
    
        //for ie7 bug : �ㅼ떆 overflow hidden. ie�먯꽌 zoom�� �놁쑝硫� �ㅽ겕濡ㅻ컮媛� 諛붾줈 �쒖떆�섏� �딆븘�� zoom=1異붽�.
        if (browser.ie==7){
            target.style.overflow='hidden';
            wrapper.style.zoom=1;
        }
    
        //mobile怨� slidermode媛� �꾨땲怨� y scroll�� �앷만 寃쎌슦 wrapper�� y scroll �먯껜�� wheel event 異붽�, �꾨땺 寃쎌슦 �쒓굅
        if (!browser.mobile && !scrollbar.slidermode){
            if (yscroll.show){
                event.add(wrapper, 'mousewheel', handle.wheel);
                if (!yscroll.hide){
                    event.add(yscroll.track, 'mousewheel', handle.wheel);
                }
            }else if (!yscroll.disable){
                event.remove(wrapper, 'mousewheel', handle.wheel);
                if (!yscroll.hide){
                    event.remove(yscroll.track, 'mousewheel', handle.wheel);
                }
            }
        }
    
        //target�� display媛� none �곹깭���� 寃쎌슦 �ㅼ떆 none
        if (notdisplayed){
            style.set(scrollbar.target, 'display', 'none');
        }
    
        //pagechange �대깽�� 蹂대깂
        if (pagechanged){
            fs.scrollevent.load(scrollbar, 'pagechange');
        }
    
        //reset �대깽��
        fs.scrollevent.load(scrollbar, 'reset');
    
        return scrollbar;
    
    }
    
    //scroll
    fs.scroll=function(scrollbar, targetflag, value, withbar, noani, returnv){
    
        var wrapper=scrollbar.wrapper, flag=(targetflag=='x' || targetflag=='left' || targetflag=='right')? 'x' : 'y', wrappercssflag=scrollbar.wcp[(flag=='x')? 0 : 1], currentscroll=scrollbar[flag];
    
        //withbar媛� false�닿퀬, value媛� �덈뒗 寃쎌슦 value�� bar�� �꾩튂. 鍮꾩쑉�� 留욊쾶 而⑦뀗痢� �꾩튂濡� �섏젙
        if (!withbar && value>0){
            value=Math.round(currentscroll.ablesize*((value-currentscroll.bminpos)/(currentscroll.bmaxpos-currentscroll.bminpos)));
        }
    
        //�곸슜�� 媛믪쓣 怨꾩궛. 120531 �꾩옱 �대룞�� 媛� to瑜� 吏��뺥빐�� �ㅽ겕濡ㅼ씠 �� �� �대떦 to媛믪뿉 scrollsize瑜� �뷀븿
        var to=Math.round((value!=undefined)? value : (targetflag=='up' || targetflag=='left')? currentscroll.to+currentscroll.scrollsize : currentscroll.to-currentscroll.scrollsize);
        if (currentscroll.scrollsizefix){
            to=Math.round(to/currentscroll.scrollsizefix)*currentscroll.scrollsizefix;
        }
        to=(to>0)? 0 : (to<currentscroll.ablesize)? currentscroll.ablesize : to;
    
        //scrollsizefix媛� �덉쓣 寃쎌슦 �꾩옱 �섏씠吏� �ㅼ젙
        if (currentscroll.scrollsizefix){
            fs.setpage(scrollbar, flag, to, true);
            if (currentscroll.scrollsizelock){
                to=-currentscroll.nowpage*currentscroll.scrollsizefix;
            }
        }
    
        //媛믪뿉 蹂��숈씠 �놁쑝硫� 痍⑥냼
        if (!scrollbar.slidermode && currentscroll.to==to){
            return null;
        }
    
        //animation �쒓굅
        fs.ani.stop(wrapper);
    
        currentscroll.to=to;
    
        //scrollTo濡� to媛믩쭔 蹂대깂
        if (returnv){
            return to;
        }
    
        //option�� animate �띿꽦�� �덇굅�� noani�몄닔媛� �놁쑝硫� �좊땲留ㅼ씠�� 泥섎━
        if (scrollbar.animate && !noani){
            var property={};
            property[wrappercssflag]=to;
            fs.handle.animate(scrollbar, property, value==undefined || withbar);
        //�꾨땲硫� 洹몃깷 �대룞
        }else{
            currentscroll.now=to;
            fs.style.set(wrapper, wrappercssflag, to);
            if (value==undefined || withbar || withbar===0){
                fs.movebar(scrollbar, flag, to, false, noani);
            }
            fs.scrollevent.load(scrollbar, 'ing');
        }
    
    }
    
    //�ㅽ겕濡� �대깽�몃� �몄텧
    fs.scrollevent={
        
        //animate�띿꽦�� false�� 寃쎌슦�먮뒗 scroll �대깽�몃쭔 �몄텧
        load : function(scrollbar, type, withing){
    
            var events=scrollbar.event, scrollstartfired=scrollbar.evs.scrollstartfired, fire=fs.scrollevent.fire;
    
            //scroll start
            if (type=='start' && !scrollstartfired && scrollbar.animate){
    
                if (events.scrollstart.length){
                    fire(scrollbar, 'scrollstart');
                }
                scrollbar.evs.scrollstartfired=true;
    
            //scroll ing
            }else if (type=='ing' && events.scroll.length){
    
                fire(scrollbar, 'scroll');
    
            //scroll end
            }else if (type=='end'){
    
                //scroll �대깽�몃쭔 �ъ슜�� �� �덉쑝�� 媛숈씠 �ㅽ뻾
                if (withing){
                    fs.scrollevent.load(scrollbar, 'ing');
                }
                
                if (scrollstartfired){
                    if (events.scrollend.length){
                        fire(scrollbar, 'scrollend');
                    }
                    scrollbar.evs.scrollstartfired=false;
                }
    
            //pagechange, reset
            }else if (type=='pagechange' || type=='reset'){
    
                if (events[type].length){
                    fire(scrollbar, type);
                }
    
            }
    
        },
    
        fire : function(scrollbar, type){
            var bullet=fs.scrollevent.bullet(scrollbar, type), events=scrollbar.event[type];
            for (var i=0, max=events.length; i<max; i++){
                events[i].call(scrollbar, bullet);
            }
        },
    
        //�ㅽ겕濡� �대깽�몄뿉 �섍꺼以� �뺣낫
        bullet : function(scrollbar, type){
            var xscroll=scrollbar.x, yscroll=scrollbar.y;
            return {
                type : type,
                scrollLeft : -xscroll.now,
                scrollTop : -yscroll.now,
                scrollWidth : Math.max(xscroll.contentsize, xscroll.clientsize) || 0,
                scrollHeight : Math.max(yscroll.contentsize, yscroll.clientsize) || 0,
                pageLeft : xscroll.nowpage || 0,
                pageTop : yscroll.nowpage || 0,
                totalPageLeft : xscroll.totalpage || 0,
                totalPageTop : yscroll.totalpage || 0,
                barLeft : xscroll.bar && xscroll.bar.offsetLeft || 0,
                barTop : yscroll.bar && yscroll.bar.offsetTop || 0,
                barWidth : xscroll.bar && xscroll.bar.offsetWidth || 0,
                barHeight : yscroll.bar && yscroll.bar.offsetHeight || 0
            };
        }
    
    }
    
    //bar�� arrow瑜� �꾨Ⅴ怨� �덉쓣 寃쎌슦 �먮룞 �ㅽ겕濡�
    fs.autoscroll=function(scrollbar, flag, value, fromslider){
    
        //slider mode �� 寃쎌슦�먮뒗 �대떦 �꾩튂濡� ��린怨� ��
        if (scrollbar.slidermode){
            if (!fromslider){
                value=Math.max(value-scrollbar[flag].bnowsize/2, 0);
            }
            fs.scroll(scrollbar, flag, value, 0);
            return;
        }
    
        var xscroll=scrollbar.x, yscroll=scrollbar.y;
    
        fs.killautoscroll(scrollbar);
        fs.event.add(document, 'mouseup', scrollbar.handle.killautoscroll);
    
        //諛⑺뼢�� 援ы븿
        //value媛� �덉쑝硫� track
        if (value!=undefined){
            if (flag=='x'){
                flag=((xscroll.bar.offsetLeft+xscroll.bar.offsetWidth)>value)? 'left' : 'right';
            }else{
                flag=((yscroll.bar.offsetTop+yscroll.bar.offsetHeight)>value)? 'up' : 'down';
            }
        //value媛� �놁쑝硫� arrow. arrow�� 寃쎌슦 value瑜� bar�� min/max position�쇰줈 吏���
        }else{
            flag=flag.match(/arrow-([a-z]+)/)[1];
            value=(flag=='up')? yscroll.bminpos : (flag=='down')? yscroll.bmaxpos+yscroll.bar.offsetHeight
                : (flag=='left')? xscroll.bminpos : xscroll.bmaxpos+xscroll.bar.offsetWidth;
        }
    
        var isfirst=true;
        var action=function(){
    
            //value瑜� 吏��섏튂嫄곕굹 value�� 媛숈쑝硫� �앸깂
            if (
                (flag=='left' && xscroll.bar.offsetLeft<=value) || (flag=='right' && xscroll.bar.offsetLeft+xscroll.bar.offsetWidth>=value)
                || (flag=='up' && yscroll.bar.offsetTop<=value) || (flag=='down' && yscroll.bar.offsetTop+yscroll.bar.offsetHeight>=value)
            ){
                fs.killautoscroll(scrollbar);
                return;
            }
    
            fs.scroll(scrollbar, flag);
            scrollbar.evs.astimer=setTimeout(action, (isfirst)? 500 : 30);
            isfirst=false;
    
        }
        action();
    
    }
    
    //�먮룞 �ㅽ겕濡� ���대㉧ clear
    fs.killautoscroll=function(scrollbar){
        clearTimeout(scrollbar.evs.astimer);
        fs.event.remove(document, 'mouseup', scrollbar.handle.killautoscroll);
    }
    
    //scrollLeft
    fs.scrollLeft=function(scrollbar, value, noani){
        if (!isNaN(value)){
            fs.scroll(scrollbar, 'x', -value, true, noani);
        }else{
            return -scrollbar.x.now;
        }
    }
    
    //scrollTop
    fs.scrollTop=function(scrollbar, value, noani){
        if (!isNaN(value)){
            fs.scroll(scrollbar, 'y', -value, true, noani);
        }else{
            return -scrollbar.y.now;
        }
    }
    
    //max scroll left
    fs.maxScrollLeft=function(scrollbar){
        return -scrollbar.x.ablesize;
    }
    
    //max scroll top
    fs.maxScrollTop=function(scrollbar){
        return -scrollbar.y.ablesize;
    }
    
    //stop
    //�ㅽ겕濡� 踰붿쐞瑜� �섏뼱媛붿쑝硫� 珥덇린�뷀븯怨� scroll �대깽�� �섍�. 踰붿쐞瑜� �섏뼱媛�吏� �딆븯�쇰㈃ �꾩옱媛믪쓣 Math.round泥섎━
    //swipe start�먯꽌�� �ㅽ뻾. swipe start�먯꽌 �ㅽ뻾�섎뒗 寃� �꾨땲硫� end�대깽�� �ㅽ뻾.
    fs.stop=function(scrollbar, withendevent){
    
        fs.ani.stop(scrollbar.wrapper);
    
        var i, flag, currentscroll;
        for (i=0; i<2; i++){
            flag=(!i)? 'x' : 'y';
            currentscroll=scrollbar[flag];
            if (!currentscroll.disable){
                currentscroll.now=currentscroll.to=(currentscroll.now>0)? 0 : (currentscroll.ablesize>currentscroll.now)? currentscroll.ablesize : Math.round(currentscroll.now);
                fs.style.set(scrollbar.wrapper, scrollbar.wcp[i], currentscroll.now);
                fs.movebar(scrollbar, flag, currentscroll.now, true);
            }
        }
    
        if (fs.eventkiller.killed){
            fs.eventkiller.leave();
        }
    
        if (withendevent){
            fs.scrollevent.load(scrollbar, 'end', true);
            fs.event.remove(document, 'mousemove', scrollbar.handle.swipe, scrollbar.id);
            fs.event.remove(document, 'mouseup', scrollbar.handle.swipeend, scrollbar.id);
            return scrollbar;
        }
    
    }
    
    //swipe cancel
    fs.cancelSwipe=function(scrollbar){
        fs.event.remove(document, 'mousemove', scrollbar.handle.swipe, scrollbar.id);
        return scrollbar;
    }
    
    //scrollTo
    //scroll�⑥닔�� x,y媛� 援щ텇�섏뼱 �덉뼱�� 洹몃깷 scroll�� �ㅽ뻾�덉쓣 寃쎌슦 �댁쟾 animation timer媛� clear�섏꽌 y留� �곸슜��
    //animation�⑥닔�먯꽌 timer瑜� �띿꽦蹂꾨줈 援щ텇�섎㈃ �섍릿 �섏�留� �ㅽ겕濡� �대깽�� 蹂대궡�� 臾몄젣�� �덇퀬 �닿쾶 �� �섏� 寃� 媛숈븘�� �쇰떒�� �대젃寃�.. 
    fs.scrollTo=function(scrollbar, x, y, noani){
        var to, property={}, wrapper=scrollbar.wrapper, wcp=scrollbar.wcp;
        if (!isNaN(x)){
            to=fs.scroll(scrollbar, 'x', -x, false, false, true);
            if (to || to===0){
                property[wcp[0]]=to;
            }
        }
        if (!isNaN(y)){
            to=fs.scroll(scrollbar, 'y', -y, false, false, true);
            if (to || to===0){
                property[wcp[1]]=to;
            }
        }
        if (!isNaN(property[wcp[0]]!=undefined) || !isNaN(property[wcp[1]]!=undefined)){
            if (scrollbar.animate && !noani){
                fs.handle.animate(scrollbar, property, true);
            }else{
                for (var i=0, flag; i<2; i++){
                    if (!isNaN(property[wcp[i]])){
                        flag=(!i)? 'x' : 'y';
                        scrollbar[flag].now=scrollbar[flag].to=property[wcp[i]];
                        fs.style.set(wrapper, wcp[i], property[wcp[i]]);
                        fs.movebar(scrollbar, flag, property[wcp[i]]);
                    }
                }
                fs.scrollevent.load(scrollbar, 'ing');
            }
        }
    }
    
    //bar �꾩튂 �대룞
    fs.movebar=function(scrollbar, flag, value, fromswipe, noani){
    
        var currentscroll=scrollbar[flag];
    
        if (currentscroll.show && !currentscroll.hide){
    
            value=currentscroll.bminpos+((currentscroll.bmaxpos-currentscroll.bminpos)*(value/currentscroll.ablesize));
    
            //swipe�좊븣 ��吏곸씠�� 寃쎌슦 min, max �꾩튂瑜� �섏� �딄쾶 �섍퀬 �섏쓣 寃쎌슦
            //bar�� �ш린瑜� 媛�濡쒖꽭濡쒓� 媛숈쓣�뚭퉴吏�留� 以꾩씠怨� position value瑜� �ㅼ떆 �ㅼ젙
            var barsize, flags, cssflag=(flag=='x')? 'left' : 'top';
            if (fromswipe){
                flags=(flag=='x')? ['offsetHeight', 'width'] : ['offsetWidth', 'height'];
                barsize=currentscroll.bnowsize;
                if (currentscroll.bminpos>value){
                    barsize=Math.round(currentscroll.bnowsize+(value-currentscroll.bminpos)*4);
                    if (currentscroll.bar[flags[0]]-currentscroll.bsizem>barsize){
                        barsize=currentscroll.bar[flags[0]]-currentscroll.bsizem;
                    }
                    value=currentscroll.bminpos;
                }else if (value>currentscroll.bmaxpos){
                    barsize=Math.round(currentscroll.bnowsize+(currentscroll.bmaxpos-value)*4);
                    if (currentscroll.bar[flags[0]]-currentscroll.bsizem>barsize){
                        barsize=currentscroll.bar[flags[0]]-currentscroll.bsizem;
                    }
                    value=currentscroll.bmaxpos+currentscroll.bnowsize-barsize;
                }
                fs.style.set(currentscroll.bar, flags[1], barsize);
            }
    
            //slidermode硫댁꽌 noani媛� �놁쑝硫� �좊땲留ㅼ씠�섏쓣 �꾪빐 scroll �쒗궡 
            //泥섏쓬 default value�쇰븣�� �좊땲留ㅼ씠�섏쓣 �놁븷湲� �꾪빐�� noani 異붽�
            if (scrollbar.slidermode && !noani){
                var property={};
                property[cssflag]=value;
                fs.ani.set(currentscroll.bar, property, { time:0.5 });
            }else{
                fs.style.set(currentscroll.bar, cssflag, value);
            }
    
        }
    
    }
    
    //page set. �꾩옱 page�� �ㅻⅤ硫� pagechange event �몄텧
    //page媛� 蹂�寃쎈릺�덈뒗吏� �꾨땶吏� true | false return
    fs.setpage=function(scrollbar, flag, to, runevent){
        var currentscroll=scrollbar[flag], page=Math.round(-to/currentscroll.scrollsizefix);
        page=(0>page)? 0 : (page>currentscroll.totalpage-1)? currentscroll.totalpage-1 : page;
        if (page!=currentscroll.nowpage){
            currentscroll.nowpage=page;
            runevent && fs.scrollevent.load(scrollbar, 'pagechange');
            return true;
        }
        return false;
    }
    
    //�대깽�� �몃뱾�щ뱾
    fs.handle={
    
        //event handler - mouse down | touch start
        start : function(scrollbar, target, e){
    
            var flag, etarget, eventvars=scrollbar.evs, handle=scrollbar.handle, browser=fs.browser, addevent=fs.event.add;
    
            if (scrollbar.slidermode){
                fs.ani.stop(scrollbar[(scrollbar.y.disable)? 'x' : 'y'].bar);
            }else{
                fs.stop(scrollbar);
            }
    
            //�ㅽ겕濡� 諛⑺뼢 珥덇린��
            eventvars.swdrt=0;
    
            flag=target.dataset.fsflag;
            eventvars.target=target;
    
            //wrapper - swipe
            if (flag=='wrapper'){
    
                //srcElement媛� input, select, textarea硫� move�� �� blur
                etarget=e.target || e.srcElement;
                var srctag=etarget.nodeName.toLowerCase();
                if (srctag=='input' || srctag=='select' || srctag=='textarea'){
                    //input type�� range硫� swipe 痍⑥냼
                    //select�� mobile�� �꾨땶 webkit釉뚮씪�곗��먯꽌 blur瑜� 以섎룄 �듭뀡�� �놁뼱吏�吏��� �딄퀬 援щ━寃� �섎뒗�� 諛⑸쾿�� �� 紐⑤Ⅴ寃좎뼱�� 媛숈씠 痍⑥냼
                    if ((srctag=='input' && etarget.type=='range') || (srctag=='select' && !browser.mobile && browser.webkit)){
                        return true;
                    }
                    eventvars.fcusel=etarget;
                //�꾨땲怨�, 紐⑤컮�쇱씠 �꾨땲硫� preventDefault�댁꽌 �띿뒪�� �좏깮�덈릺寃�
                }else if (!browser.mobile && e.preventDefault){
                    e.preventDefault();
                }
    
                eventvars.sweventdead=false;
                eventvars.offsetpos=[scrollbar.x.now, scrollbar.y.now];
                eventvars.clientpos=eventvars.swbasepos=fs.handle.getpoint(e);
                eventvars.swstime=new Date().getTime();
                addevent(document, 'mousemove', handle.swipe, scrollbar.id);
                addevent(document, 'mouseup', handle.swipeend, scrollbar.id);
    
                return true;
    
            //track�� 寃쎌슦 autoscroll�ㅽ뻾 �대┃�� 吏��먮쭔�쇰쭔 ��吏곸씠寃� �대┃�� 吏��먯쓣 �섍꺼以�
            }else if ((/track/).test(flag)){
    
                etarget=e.target || e.srcElement;
                flag=flag.match(/track-([a-z]+)/)[1];
                fs.autoscroll(scrollbar, flag, (flag=='x')? (e.offsetX || e.layerX)+etarget.offsetLeft : (e.offsetY || e.layerY)+etarget.offsetTop);
    
            //arrow�� 寃쎌슦 autoscroll�ㅽ뻾
            }else if ((/arrow/).test(flag)){
    
                fs.autoscroll(scrollbar, flag);
    
            //bar
            }else{
    
                if (flag=='bar-x'){
                    eventvars.offsetpos=target.offsetLeft;
                    eventvars.clientpos=fs.handle.getpoint(e)[0];
                }else{
                    eventvars.offsetpos=target.offsetTop;
                    eventvars.clientpos=fs.handle.getpoint(e)[1];
                }
    
                fs.classname.add(target, 'active');
                addevent(document, 'mousemove', handle.barmove);
                addevent(document, 'mouseup', handle.end);
    
            }
    
            return fs.handle.killevent(e, true);
    
        },
    
        //mouse up | touch end
        end : function(scrollbar, e){
    
            fs.classname.remove(scrollbar.evs.target, 'active');
            fs.event.remove(document, 'mousemove', scrollbar.handle.barmove);
            fs.event.remove(document, 'mouseup', scrollbar.handle.end);
    
        },
    
        //bar - mouse move | touch move
        barmove : function(scrollbar, e){
    
            var newposition, eventvars=scrollbar.evs, flag=eventvars.target.dataset.fsflag.match(/bar-(x|y)/)[1], currentscroll=scrollbar[flag], cssflag=(flag=='x')? 'left' : 'top', nowposition=fs.handle.getpoint(e)[(flag=='x')? 0 : 1];
    
            if (eventvars.clientpos!=nowposition){
    
                newposition=eventvars.offsetpos-(eventvars.clientpos-nowposition);
                if (currentscroll.bminpos>newposition){
                    newposition=currentscroll.bminpos;
                }else if (newposition>currentscroll.bmaxpos){
                    newposition=currentscroll.bmaxpos;
                }
    
                fs.style.set(eventvars.target, cssflag, newposition);
                fs.scroll(scrollbar, flag, newposition);
    
            }
    
            return fs.handle.killevent(e);
    
        },
    
        //mouse wheel
        wheel : function(scrollbar, e){
    
            var wheeldata=e.wheelDelta || e.detail, yscroll=scrollbar.y;
            if (fs.browser.firefox){
                wheeldata*=-1;
            }
    
            //blockparentscroll�� �ъ슜�섏� �딄퀬 �� �댁긽 �ㅽ겕濡� �� 媛믪씠 �놁쓣 �뚮뒗 洹몃깷 �섍�
            if (!yscroll.blockparentscroll && ((wheeldata>0 && yscroll.now==0) ||
                (0>wheeldata && yscroll.now==yscroll.ablesize))){
                return true;
            }
    
            fs.scroll(scrollbar, (wheeldata>0)? 'up' : 'down');
    
            return fs.handle.killevent(e, true);
    
        },
    
        //swipe
        swipe : function(scrollbar, e){
    
            if (scrollbar.evs.sweventdead){
                return true;
            }
    
            var eventvars=scrollbar.evs,handle=fs.handle, nowposition=handle.getpoint(e), nowtime=new Date().getTime();
            var i, pagechanged, property, moved=[], newposition=[], flag=['x', 'y'], xscroll=scrollbar.x, yscroll=scrollbar.y, currentscroll;
    
            for (i=0; i<2; i++){
                //�대룞�� 嫄곕━
                moved[i]=eventvars.clientpos[i]-nowposition[i];
                //�� �꾩튂瑜� �ㅼ젙
                newposition[i]=eventvars.offsetpos[i]-moved[i];
            }
    
            //swipe諛⑺뼢�� �뺥빐�� �덉� �딆쑝硫�
            if (!eventvars.swdrt && (Math.abs(moved[0]) || Math.abs(moved[1]))){
    
                //swipe 諛⑺뼢�� �뺥븿. x, y瑜� 湲곗��쇰줈 짹30�� �덉そ�대㈃ 諛⑺뼢怨좎젙 f==free �뗣뀑
                var degree=Math.abs((Math.atan2(moved[0], moved[1])*180)/Math.PI);
                eventvars.swdrt=
                    //y媛� �곗꽑
                    (xscroll.blockparentscroll && !yscroll.disable && (!xscroll.show || xscroll.disable))? 'y' : 
                    (yscroll.blockparentscroll && !xscroll.disable && (!yscroll.show || yscroll.disable))? 'x' : 
                    (45>degree || degree>135)? 'y' : (100>degree && degree>80)? 'x' : 'f';
                    //(15>degree || degree>165)? 'y' : (105>degree && degree>75)? 'x' : 'f';
    
                //blockparentscroll�� �ъ슜�섏� �딄퀬 諛⑺뼢�� x|y�쇰븣 �대떦 諛⑺뼢�� �� �댁긽 �ㅽ겕濡� �� 媛믪씠 �놁쓣 �뚮뒗 洹몃깷 �섍�
                for (i=0; i<2; i++){
                    currentscroll=scrollbar[flag[i]]; 
                    if (!currentscroll.blockparentscroll && eventvars.swdrt==flag[i] && (
                        (0>moved[i] && currentscroll.now==0) || (moved[i]>0 && currentscroll.now==currentscroll.ablesize)
                    )){
                        i=(!i)? 1 : 0;
                        currentscroll=scrollbar[flag[i]]; 
                        //scrollsizefix �� 寃쎌슦 x�쇰븣 y, y�쇰븣 x�� �꾩튂瑜� �� �ㅼ젙
                        if (currentscroll.scrollsizefix){
                            property={};
                            property[scrollbar.wcp[i]]=Math.round(currentscroll.now/currentscroll.scrollsizefix)*currentscroll.scrollsizefix;
                            if (!pagechanged){
                                pagechanged=fs.setpage(scrollbar, flag[i], property[scrollbar.wcp[i]]);
                            }
                            property[scrollbar.wcp[i]]=fs.ani.getvalues('', currentscroll.now, property[scrollbar.wcp[i]], fs.ani.fps/2, 'easeOutExpo');
                            handle.animate(scrollbar, property, true, true, 0.5);
                        }
                        handle.removeswipehandle(scrollbar);
                        return true;
                    }
                }
                
                if (pagechanged){
                    fs.scrollevent.load(scrollbar, 'pagechange');
                }
    
                //input, select, textarea硫� focus瑜� �댁젣
                if (eventvars.fcusel){
                    eventvars.fcusel.blur();
                    eventvars.fcusel=null;
                }
    
                //�ㅽ겕濡ㅼ씠 �섎㈃ 遺�紐� �ㅽ겕濡ㅻ컮�� document�대깽�몃� �쒓굅�댁꽌 �대떦 �ㅽ겕濡ㅻ쭔 �ㅽ뻾�섍쾶
                handle.removeswipehandle(scrollbar, true);
    
                //而⑦뀗痢좎뿉 吏��뺣맂 �대깽�몃컻�앹쓣 李⑤떒
                if (!fs.eventkiller.killed && !fs.browser.mobile){
                    fs.eventkiller.call(scrollbar.target);
                }
    
            }
    
            //start�섍퀬 0.3珥덇� 吏��� 寃쎌슦 湲곗��쒓컙怨� �꾩튂瑜� �ъ꽕��
            if (nowtime-300>eventvars.swstime){
                eventvars.swstime=nowtime;
                eventvars.swbasepos=nowposition;
            }
    
            fs.scrollevent.load(scrollbar, 'start');
    
            for (i=0; i<2; i++){
                currentscroll=scrollbar[flag[i]]; 
                if ((currentscroll.show || currentscroll.blockparentscroll) && (eventvars.swdrt=='f' || eventvars.swdrt==flag[i])){
                    //new value媛� 0蹂대떎 �ш굅�� ablesize蹂대떎 �묒쑝硫�, �대룞媛믪쓣 /2�댁꽌 �� �묎쾶 媛�寃�
                    if (newposition[i]>0){
                        newposition[i]/=2;
                    }else if (currentscroll.ablesize>newposition[i]){
                        newposition[i]-=(newposition[i]-currentscroll.ablesize)/2;
                    }
                    currentscroll.now=currentscroll.to=newposition[i];
                    fs.style.set(eventvars.target, scrollbar.wcp[i], newposition[i]);
                    fs.movebar(scrollbar, flag[i], newposition[i], true);
                }
            }
    
            fs.scrollevent.load(scrollbar, 'ing');
    
            return handle.killevent(e);
    
        },
    
        //mobile swipe end
        swipeend : function(scrollbar, e){
    
            var eventvars=scrollbar.evs, handle=fs.handle, nowposition=handle.getpoint(e), property={};
            var currentscroll, swipetime=new Date().getTime()-eventvars.swstime;
            var i, j, max, flag, to, page=[], values=[], limit=null, moved=[], pagechanged=false, fps=fs.ani.fps, easing='easeOutCubic';
    
            for (i=0; i<2; i++){
                limit=null;
                flag=(!i)? 'x' : 'y';
                currentscroll=scrollbar[flag];
                moved[i]=eventvars.swbasepos[i]-nowposition[i];
                if ((currentscroll.show || currentscroll.blockparentscroll) && ((!moved[i] && currentscroll.scrollsizefix) || eventvars.swdrt=='f' || eventvars.swdrt==flag)){
    
                    if (Math.abs(moved[i])>5){
    
                        //scrollsizelock�� 嫄몃젮�덉쑝硫� page�⑥쐞濡� �대룞
                        if (currentscroll.scrollsizelock){
    
                            //�ㅽ겕濡� 踰붿쐞瑜� 踰쀬뼱�� 寃쎌슦 scrollsizefix蹂대떎 ��吏곸씤 嫄곕━媛� �щ㈃ page�대룞. 
                            if (currentscroll.now>0 || currentscroll.ablesize>currentscroll.now){
                                if (Math.abs(moved[i])>currentscroll.scrollsizefix){
                                    page[i]=(moved[i]>0)? currentscroll.nowpage+1 : currentscroll.nowpage-1;
                                }
                            //0.3珥� �덉뿉 �곸뿭 �덉そ�먯꽌 ��吏곸��쇰㈃ ��吏곸씤 諛⑺뼢�쇰줈 page �ㅼ젙
                            }else if (300>swipetime){
                                page[i]=(moved[i]>0)? currentscroll.nowpage+1 : currentscroll.nowpage-1;
                            }
                            //�꾨땲硫� 媛�源뚯슫 �섏씠吏�濡�
                            if (page[i]==undefined){
                                currentpage=Math.round(-currentscroll.now/currentscroll.scrollsizefix);
                                page[i]=(currentpage>currentscroll.nowpage)? currentscroll.nowpage+1 : (currentscroll.nowpage>currentpage)? currentscroll.nowpage-1 : currentpage;
                            }
                            page[i]=(0>page[i])? 0 : (page[i]>currentscroll.totalpage-1)? currentscroll.totalpage-1 : page[i];
                            values[i]=fs.ani.getvalues('', currentscroll.now, -page[i]*currentscroll.scrollsizefix, fps, 'easeOutExpo');
    
                        //0.3珥� �덉뿉 ��吏곸�怨� ��吏곸씤 嫄곕━媛� �덉쑝硫� swipe
                        }else if (300>swipetime && moved[i]){
    
                            to=Math.round(currentscroll.now-moved[i]*((300-swipetime)/25));
                            if (currentscroll.scrollsizefix){
                                to=Math.round(to/currentscroll.scrollsizefix)*currentscroll.scrollsizefix;
                            }
    
                            //�ㅽ겕濡� 踰붿쐞瑜� �대� �섏뼱媛� �곹깭�먯꽌 �섏뼱媛� 諛섎�諛⑺뼢�� 寃쎌슦 理쒖쥌 to媛� �ㅽ겕濡� 踰붿쐞�먯꽌 �꾩옱 珥덇낵�� 踰붿쐞瑜� 類� 媛믩낫�� �묒쑝硫� 痍⑥냼
                            if ((moved[i]>0 && to>-currentscroll.now) || (0>moved[i] && currentscroll.ablesize+currentscroll.ablesize-currentscroll.now>to)){
                                to=(moved[i]>0)? 0 : currentscroll.ablesize;
                                values[i]=fs.ani.getvalues(scrollbar.wcp[i], currentscroll.now, to, fps/2, easing);
                            }else{
                                //�ㅽ겕濡� 踰붿쐞瑜� �대� �섏뼱媛� �곹깭�먯꽌 �섏뼱媛� 諛⑺뼢�쇰줈 ��吏곸��쇰㈃ ��吏곸씤 �ш린留뚰겮留� 吏���
                                if ((0>moved[i] && currentscroll.now>0) || (moved[i]>0 && currentscroll.ablesize>currentscroll.now)){
                                    limit=currentscroll.now-moved[i]/4;
                                    values[i]=fs.ani.getvalues('', currentscroll.now, limit, fps/10, easing);
                                    j=values[i].length;
                                }else{
                                    values[i]=fs.ani.getvalues('', currentscroll.now, to, fps*2, easing);
                                    //媛믩뱾�� 而⑦뀗痢� �ㅽ겕濡� 踰붿쐞瑜� �섏뼱媛붾뒗吏� 泥댄겕�댁꽌 �섏뼱媛붿쑝硫� limit留뚰겮 媛�怨� �ㅼ떆 �먯쐞移�
                                    for (j=0, max=values[i].length; j<max; j++){
                                        if (0>moved[i]){
                                            if (values[i][j]>0){
                                                if (limit==null){
                                                    limit=Math.abs((values[i][j-1] || 0)-values[i][j])*7;
                                                }
                                                if (values[i][j]>limit){
                                                    values[i][j]/=2;
                                                    j=j+1;
                                                    values[i].length=j;
                                                    break;
                                                }
                                                values[i][j]/=2;
                                            }
                                        }else if (currentscroll.ablesize>values[i][j]){
                                            if (limit==null){
                                                limit=currentscroll.ablesize-((values[i][j-1] || currentscroll.ablesize)-values[i][j])*7;
                                            }
                                            if (limit>values[i][j]){
                                                values[i][j]-=(values[i][j]-currentscroll.ablesize)/2;
                                                j=j+1;
                                                values[i].length=j;
                                                break;
                                            }
                                            values[i][j]-=(values[i][j]-currentscroll.ablesize)/2;
                                        }
                                    }
                                }
                                //踰붿쐞瑜� �섏뼱媛붿쑝硫� 留욌뒗 �꾩튂濡� �뚮┝
                                if ((0>moved[i] && values[i][j-1]>0) || (moved[i]>0 && currentscroll.ablesize>values[i][j-1])){
                                    to=(0>moved[i])? 0 : currentscroll.ablesize;
                                    values[i]=values[i].concat(fs.ani.getvalues('', values[i][j-1], to, fps/2, easing));
                                }
                            }
                            if (currentscroll.scrollsizefix){
                                page[i]=Math.round(-to/currentscroll.scrollsizefix);
                            }
    
                        }
    
                    }
    
                    //�대룞�� �놁쑝硫� �� �꾩튂濡�
                    if (!values[i]){
                        to=(currentscroll.now>0)? 0 : (currentscroll.ablesize>currentscroll.now)? currentscroll.ablesize : Math.round(currentscroll.now);
                        if (currentscroll.scrollsizefix){
                            to=Math.round(to/currentscroll.scrollsizefix)*currentscroll.scrollsizefix;
                            page[i]=Math.round(-to/currentscroll.scrollsizefix);
                            page[i]=(0>page[i])? 0 : (page[i]>currentscroll.totalpage-1)? currentscroll.totalpage-1 : page[i];
                        }
                        values[i]=fs.ani.getvalues('', currentscroll.now, to, fps/2, easing);
                    }
    
                    //page泥댄겕
                    if (page[i]!=currentscroll.nowpage){
                        currentscroll.nowpage=page[i];
                        pagechanged=true;
                    }
    
                    property[scrollbar.wcp[i]]=values[i];
    
                }
            }
    
            //page媛� 蹂�寃쎈릱�쇰㈃ pagechange�대깽��
            if (pagechanged){
                fs.scrollevent.load(scrollbar, 'pagechange');
            }
    
            if (property[scrollbar.wcp[0]]!=undefined || property[scrollbar.wcp[1]]!=undefined){
                handle.animate(scrollbar, property, true, true, 2);
            }else{
                fs.scrollevent.load(scrollbar, 'end');
            }
    
            handle.removeswipehandle(scrollbar);
    
            if (fs.eventkiller.killed){
                fs.eventkiller.leave();
                return handle.killevent(e);
            }
    
        },
    
        //scroll animation
        animate : function(scrollbar, property, withbar, fromswipe, time){
            fs.ani.set(scrollbar.wrapper, property, {
                time : time,
                onstart : function(){
                    fs.scrollevent.load(scrollbar, 'start');
                },
                onupdate : function(v){
                    fs.handle.onanimate(scrollbar, v, withbar, fromswipe);
                },
                onend : function(v){
                    fs.handle.onanimate(scrollbar, v, withbar, fromswipe);
                }
            });
        },
    
        onanimate : function(scrollbar, v, withbar, fromswipe){
            var wcp=scrollbar.wcp;
            if (v[wcp[0]]!=undefined){
                scrollbar.x.now=v[wcp[0]];
                if (fromswipe){
                    scrollbar.x.to=scrollbar.x.now;
                }
                if (withbar){
                    fs.movebar(scrollbar, 'x', v[wcp[0]], fromswipe);
                }
            }
            if (v[wcp[1]]!=undefined){
                scrollbar.y.now=v[wcp[1]];
                if (fromswipe){
                    scrollbar.y.to=scrollbar.y.now;
                }
                if (withbar){
                    fs.movebar(scrollbar, 'y', v[wcp[1]], fromswipe);
                }
            }
            fs.scrollevent.load(scrollbar, (v.type=='update')? 'ing' : 'end', true);
        },
    
        //swipe 愿��� document event handler �쒓굅
        //parent媛� true�대㈃ 遺�紐� �ㅽ겕濡ㅻ컮�� event handler留� �쒓굅.
        removeswipehandle : function(scrollbar, parent){
            var removeevent=fs.event.remove;
            if (parent){
                var i, j, targetscrollbar, flag=['x', 'y'], max=fs.items.length, parent=scrollbar.target.parentNode;
                while (parent.nodeName.toLowerCase()!='body'){
                    for (i=0; i<max; i++){
                        targetscrollbar=fs.items[i];
                        if (targetscrollbar && targetscrollbar.target==parent){
                            //ie8�댄븯 踰꾩쟾�먯꽌 �몄텧�쒖꽌媛� �ㅻⅨ 臾몄젣�뚮Ц�� mouseup�� �먯쓣 �� �대룞�섏� �딄쾶 �섍린 �꾪빐 swipe direction�� 'q'濡� �ㅼ젙.
                            targetscrollbar.evs.swdrt='q';
                            targetscrollbar.stop();
                            //removeevent(document, 'mousemove', targetscrollbar.handle.swipe, targetscrollbar.id);
                            //removeevent(document, 'mouseup', targetscrollbar.handle.swipeend, targetscrollbar.id);
                            //ie8�댄븯 踰꾩쟾�먯꽌�� event handler�� �몄텧 �쒖꽌媛� 吏��뺣맂 �쒖꽌�� �щ씪�� 遺�紐� �ㅽ겕濡� 癒쇱� �ㅽ겕濡� �섎뒗 嫄� 留됱쓣 �� �놁쓬. �먮옒 �꾩튂濡� �섎룎由�
                            //ie9�� opera�먯꽌�� event媛� remove �섍퀬�섏꽌�� �� 踰� �� �ㅽ뻾�� �섏꽌.. ��
                            //sweventdead �띿꽦�� 異붽��섍퀬 swipe handler�먯꽌 sweventdead媛� true硫� 痍⑥냼
                            //�닿쾶 留욌뒗 嫄댁쭊 紐⑤Ⅴ寃좎쓬 �뗣뀑
                            targetscrollbar.evs.sweventdead=true;
                            if (9>fs.browser.ie){
                                for (j=0; j<2; j++){
                                    targetscrollbar[flag[j]].now=targetscrollbar[flag[j]].to=targetscrollbar.evs.offsetpos[j];
                                    fs.style.set(targetscrollbar.wrapper, targetscrollbar.wcp[j], targetscrollbar[flag[j]].now);
                                    fs.movebar(targetscrollbar, flag[j], targetscrollbar[flag[j]].now, true);
                                }
                            }
                            break;
                        }
                    }
                    parent=parent.parentNode;
                }
            }else{
                removeevent(document, 'mousemove', scrollbar.handle.swipe, scrollbar.id);
                removeevent(document, 'mouseup', scrollbar.handle.swipeend, scrollbar.id);
            }
        },
    
        //�꾨Ⅸ 吏���
        getpoint : function(e){
            return (fs.browser.mobile)? 
                [
                    (e.touches[0])? e.touches[0].pageX : e.changedTouches[0].pageX, 
                    (e.touches[0])? e.touches[0].pageY : e.changedTouches[0].pageY
                ] :
                [e.clientX, e.clientY];
        },
    
        killevent : function(e, withpreventdefault){
            if (e.stopPropagation){
                e.stopPropagation();
                if (withpreventdefault && e.preventDefault){
                    e.preventDefault();
                }
            }
            e.cancelBubble=true;
            e.returnValue=false;
            return false;
        }
    
    }
    
    //�ㅽ겕濡ㅻ컮 �쒓굅. wrapper, track �쒓굅
    fs.remove=function(scrollbar){
    
        var target=scrollbar.target, wrapper=scrollbar.wrapper, xtrack=scrollbar.x.track, ytrack=scrollbar.y.track;
    
        //wrapper �쒓굅
        if (wrapper){
            var childs=wrapper.childNodes;
            for (var i=0, max=childs.length; i<max; i++){
                target.appendChild(childs[i]);
                max--;
                i--;
            }
            target.removeChild(wrapper);
        }
    
        //x track �쒓굅
        if (xtrack){
            xtrack.parentNode.style.position='';
            xtrack.parentNode.removeChild(xtrack);
        }
    
        //y track �쒓굅
        if (ytrack){
            ytrack.parentNode.style.position='';
            ytrack.parentNode.removeChild(ytrack);
        }
    
        //overflow �� �ㅼ젙
        target.style.overflow='';
    
    
        //fs.items�먯꽌�� �쒓굅
        for (var i=0, items=fs.items, max=items.length; i<max; i++){
            if (items[i]==scrollbar){
                items[i]=null;
                break;
            }
        }
    
        return null;
    
    }
    
    //�대깽�� add, remove
    //ie�먯꽌 �대깽�� currentTarget 愿��� 李몄“ - Flexible Javascript Events(http://ejohn.org/projects/flexible-javascript-events/)
    fs.event={
    
        typeinmobile : {
            mouseover : 'touchstart',
            mousedown : 'touchstart',
            mousemove : 'touchmove',
            mouseout : 'touchend',
            mouseup : 'touchend'
        },
    
        type : function(type){
            var browser=fs.browser, typeinmobile=fs.event.typeinmobile;
            if (browser.mobile && typeinmobile[type]){
                return typeinmobile[type];
            }else if (browser.firefox && type=='mousewheel'){
                return 'DOMMouseScroll';
            }
            return type;
        },
    
        //swipe�� �� 以묒꺽�� �덉쑝硫� document�� handler媛� �щ윭媛� 遺숆쾶 �섎뒗�� type+callback�� �띿꽦 紐낆쑝濡쒕쭔 �곕㈃
        //�대떦 handler瑜� �쒕�濡� remove�섏� 紐삵빐�� id瑜� 異붽�濡� 遺숈엫 ��
        add : function(target, type, callback, id){
            type=fs.event.type(type);
            if (target.addEventListener){
                target.addEventListener(type, callback, false);
            }else{
                target[type+id+callback]=function(){
                    callback.call(target, window.event);
                }
                target.attachEvent('on'+type, target[type+id+callback]);
            }
        },
    
        remove : function(target, type, callback, id){
            type=fs.event.type(type);
            if (target.removeEventListener){
                target.removeEventListener(type, callback, false);
            }else{
                if (target[type+id+callback]){
                    target.detachEvent('on'+type, target[type+id+callback]);
                    target[type+id+callback]=null;
                }
            }
        }
    
    }
    
    //css �대옒�ㅻ챸 add, remove
    fs.classname={
    
        add : function(target, name){
            target.className=fs.classname.base(target, name)+' '+name;
        },
    
        remove : function(target, name){
            target.className=fs.classname.base(target, name);
        },
    
        base : function(target, name){
            return (' '+target.className).replace(new RegExp(' '+name, 'g'), '').replace(/^ /, '');
        }
    
    }
    
    //�ㅽ��� get, set
    fs.style={
    
        exp : [//translate3d, translate
            //get, set x, set y
            [/translate3d\(([e0-9\-\.]+)(?:px)?, ([e0-9\-\.]+)(?:px)?/, /(translate3d\()[e0-9\-\.]+(?:px)?/, /(translate3d\([e0-9\-\.]+(?:px)?, )[e0-9\-\.]+(?:px)?/],
            [/translate\(([e0-9\-\.]+)(?:px)?, ([e0-9\-\.]+)(?:px)?/, /(translate\()[e0-9\-\.]+(?:px)?/, /(translate\([e0-9\-\.]+(?:px)?, )[e0-9\-\.]+(?:px)?/]
        ],
    
        get : function(target, property){
            var rv, translate, support=fs.browser.support;
            if ((/^t(x|y)(3d)?/).test(property)){
                translate=property;
                property=support.transform;
            }else if (property=='opacity' && !support.opacity){
                property='filter';
            }
            var rv=(target.style[property])? target.style[property] :
                    (target.currentStyle)? target.currentStyle[property] :
                        document.defaultView.getComputedStyle(target, null)[property];
            if (property==support.transform){
                if ((/3d/).test(translate)){//translate3d
                    rv=rv.match(fs.style.exp[0][0]);
                    return (!rv)? 0 : parseInt((translate=='tx3d')? rv[1] : rv[2]);
                }else{//translate
                    rv=rv.match(fs.style.exp[1][0]);
                    return (!rv)? 0 : parseInt((translate=='tx')? rv[1] : rv[2]);
                }
            }
            if (property=='opacity'){
                return parseFloat(rv);
            }
            if (property=='filter'){
                rv=parseFloat(rv.match(/alpha *\( *opacity *[=:] *([0-9\.]+) *\)/i)[1]);
                return (rv || rv===0)? rv/100 : 1;
            }
            return (rv=='auto')? 0 : ((/(pt|px)$/).test(rv))? parseInt(rv) : rv;
        },
    
        set : function(target, property, value){
            var support=fs.browser.support;
            if (value!=undefined){
                if ((/^t(x|y)(3d)?/).test(property)){
                    if ((/3d/).test(property)){//translate3d
                        target.style[support.transform]=target.style[support.transform].replace(fs.style.exp[0][(property=='tx3d')? 1 : 2], '$1'+value+'px');
                    }else{//translate
                        target.style[support.transform]=target.style[support.transform].replace(fs.style.exp[1][(property=='tx')? 1 : 2], '$1'+value+'px');
                    }
                }else if (property=='opacity'){
                    if (!fs.browser.support.opacity){
                        target.style.filter='alpha(opacity='+(value*100)+')';
                    }else{
                        target.style.opacity=value;
                    }
                }else{
                    target.style[property]=(!isNaN(value))? value+'px' : value;
                }
            }
        }
    
    }
    
    //�쒓렇�앹꽦. create �� event 異붽��섍퀬, dataset�� �놁쓣 寃쎌슦 異붽�
    fs.createtag=function(scrollbar, tagname, classname, fsflag, flag){
    
        var tag=document.createElement(tagname), support=fs.browser.support;
    
        if (!tag.dataset){
            tag.dataset={};
            if (9>fs.browser.ie){
                tag.style.filter='inherit';
            }
        }
        tag.dataset.fsflag=fsflag;
    
        tag.className=classname;
    
        //usertransform �듭뀡�� �ъ슜�� 寃쎌슦 style.get set �� �� �� �닿툔�섏� �딄쾶 wrapper�� 湲곕낯 transform 媛� 吏���
        //吏��뺥븯吏� �딆쑝硫� css�먯꽌 translate濡� 吏��뺥뻽�붾씪�� matrix濡� 蹂�寃쎈릺�� �덉뼱��.
        if (fsflag=='wrapper'){
            if ((/^t(x|y)(3d)?/).test(scrollbar.wcp[0])){
                tag.style[support.transform]+=' '+((/3d/).test(scrollbar.wcp[0])? support.translate3d : support.translate);
            }
        }else{
            tag.style.position='absolute';
            //tag.style.overflow='hidden';//ie6�� hidden�� 吏��뺥븯吏� �딆쑝硫� 紐⑥뼇�� �댁긽�섍쾶 �섏삤吏�留� ie6�� �댁젣 二쎌뼱媛�怨� css�먯꽌�� 吏��뺢��ν븯�덇퉴 蹂대쪟 �뗣뀑
        }
    
        if ((fsflag=='wrapper' && scrollbar.useswipe) || (fsflag!='neutralzone' && (flag && !scrollbar[flag].nointeract))){
            fs.event.add(tag, 'mousedown', scrollbar.handle.start);
        }
    
        return tag;
    
    }
    
    //�섎━癒쇳듃 李얘린. 臾몄옄�댁씪 寃쎌슦 id濡� 李얠븘蹂닿퀬 �섎━癒쇳듃�몄� �뺤씤 �� return
    fs.findelement=function(target){
        if (typeof(target)=='string'){
            target=document.getElementById(target);
        }
        return (target && target.nodeType && target.nodeType==1)? target : null;
    }
        
    //animation �꾩떆��
    fs.ani={
    
        fps : 72, time : 1, easing : 'easeOutQuint', target:[], timer:[],
    
        set : function(target, property, option){
            option=option || {};
            var p, maxstep=0, no=fs.ani.no(target), time=option.time || fs.ani.time, totalframe=Math.round(time*fs.ani.fps), values={};
            clearTimeout(fs.ani.timer[no]);
            for (p in property){
                values[p]=(property[p].length)? property[p] : fs.ani.getvalues(p, fs.style.get(target, p), property[p], totalframe, option.easing || fs.ani.easing);
                maxstep=Math.max(values[p].length, maxstep);
            }
            if (2>maxstep){
                option.onend && option.onend({type:'end'});
                return;
            }
            var starttime, endtime, delay=(time*1000)/totalframe;
            var action=function(){
                var step=Math.round(totalframe*((new Date().getTime()-starttime)/(endtime-starttime)));
                var p, arg={};
                if (maxstep-1>step){
                    for (p in property){
                        arg[p]=values[p][step];
                        fs.style.set(target, p, arg[p]);
                    }
                    arg.type='update';
                    option.onupdate && option.onupdate.call(target, arg);
                    fs.ani.timer[no]=setTimeout(action, delay);
                }else{
                    for (p in property){
                        arg[p]=values[p][values[p].length-1];
                        fs.style.set(target, p, arg[p]);
                    }
                    arg.type='end';
                    option.onend && option.onend.call(target, arg);
                }
            };
            fs.ani.timer[no]=setTimeout(function(){
                starttime=new Date().getTime();
                endtime=starttime+(time*1000);
                option.onstart && option.onstart.call(target, {type:'start'});
                action();
            }, (option.delay || 0)*1000);
        },
    
        stop : function(target){
            clearTimeout(fs.ani.timer[fs.ani.no(target)]);
        },
    
        no : function(target){
            for (var i=0, max=fs.ani.target.length; i<max; i++){
                if (target==fs.ani.target[i]){
                    return i;
                }
            }
            fs.ani.target.push(target);
            return fs.ani.target.length-1;
        },
    
        getvalues : function(property, from, to, totalframe, easing){
            var nv, rv=[], gap=to-from, eqs=fs.ani.equations;
            for (var i=1; i<=totalframe; i++){
                nv=eqs[easing](i, from, gap, totalframe);
                rv.push((property=='opacity')? parseInt(nv*1000)/1000 : nv);
                if (nv==to){
                    return rv;
                }
            }
            return rv;
        },
    
        //Convert to JS from "Robert Penner's Easing Equations".
        //http://robertpenner.com/easing/
        equations : {
            linear : function(t,b,c,d){
                return c*t/d+b;
            },
            easeOutCubic : function(t,b,c,d){
                return c*((t=t/d-1)*t*t+1)+b;
            },
            easeOutQuint : function(t,b,c,d){
                return c*((t=t/d-1)*t*t*t*t+1)+b;
            },
            easeOutExpo : function(t,b,c,d){
                return (t==d)? b+c : c*1.001*(-Math.pow(2,-10*t/d)+1)+b;
            }
        }
    
    }
    
    //swipe�좊븣 wrapper 而⑦뀗痢좎뿉 �곸슜�� �대깽�몃뱾�� 二쎌엫
    fs.eventkiller={
    
        killer : null,
        killed : false,
    
        call : function(target){
            target.appendChild(fs.eventkiller.killer);
            fs.eventkiller.killed=true;
        },
    
        leave : function(){
            fs.eventkiller.killer.parentNode.removeChild(fs.eventkiller.killer);
            fs.eventkiller.killed=false;
        }
    
    }
    
    //browser寃���, 紐뉖챺 湲곕뒫 吏��먯뿬遺�.
    fs.browser=function(){
    
        var browser={
            support : {
                fixed : true,
                opacity : true,
                transform : false
            }
        }
    
        var nua=navigator.userAgent, ie=nua.match(/msie ([0-9])+/i);//ie
        if (ie){
            ie=parseInt(ie[1]);
            if (7>ie){
                browser.support.fixed=false;
            }
            if (9>ie){
                browser.support.opacity=false;
            }
            browser.ie=ie;
        }
        browser.firefox=(/firefox/i).test(nua);
        browser.webkit=(/applewebkit/i).test(nua);
        browser.opera=(/opera/i).test(nua);
        browser.ios=(/ip(ad|hone|od)/i).test(nua);
        browser.android=(/android/i).test(nua);
        browser.mobile=document.hasOwnProperty && document.hasOwnProperty('ontouchstart') && (browser.ios || browser.android);
    
        //event killer濡� �ъ슜�� div 吏���. �섎㈃�� support �뺤씤
        var div=document.createElement('div'), css='position:absolute;left:0;top:0;width:100%;height:100%;background:#f60;z-index:10000;opacity:0;';
        if (!browser.support.opacity){
            css+='filter:alpha(opacity=0)';
        }
        div.style.cssText=css;
    
        //釉뚮씪�곗� transform 吏��먯뿬遺�.
        var n=['t', 'WebkitT', 'MozT', 'OT', 'msT'], t='ransform', ts='ransition';
        if (div.style.hasOwnProperty){
            for (var i=0; i<5; i++){
                if (div.style[n[i]+ts]!=undefined){
                    browser.support.transition=n[i]+ts;
                }
                if (div.style[n[i]+t]!=undefined){
                    t=n[i]+t;
                    browser.support.transform=t;
                    //translate3d吏��먯뿬遺�. 媛믪� 湲곕낯 吏��뺢컪�� 吏���.
                    div.style[t]='translate3d(0px, 0px, 0px)';
                    browser.support.translate3d=div.style[t];
                    //translate吏��먯뿬遺�. 媛믪� 湲곕낯 吏��뺢컪�� 吏���.
                    div.style[t]='translate(0px, 0px)';
                    browser.support.translate=div.style[t];
                    div.style[t]='';
                    break;
                }
            }
        }
    
        fs.eventkiller.killer=div;
    
        return browser;
    
    }();
    
    
    
    
    
    //�꾨━��
    fs.preset=function(target, name, option, presetoption){
        target=fs.findelement(target);
        if (!target){
            return null;
        }
        option=option || {};
        option.x=option.x || {};
        option.y=option.y || {};
        return fs.presetlist[name](target, option, presetoption);
    }
    
    fs.presetlist={
    
        //ios �ㅽ겕濡� �됰궡
        'ios-mode' : function(target, option, hideatfirst){
    
            fs.classname.add(target, fs.cssclass.iosmode);
            option.animate=true;
            option.tracksize=option.tracksize || '-2';
            option.nointeract=true;
            option.barminsize=35;
    
            var i, currentscroll, scrollbar=fs.set(target, option);
            scrollbar.display=function(e, isfirst){
                for (i=0; i<2; i++){
                    currentscroll=scrollbar[(!i)? 'x' : 'y'];
                    if (!currentscroll.disable && !currentscroll.hide){
                        if (e.type=='scrollstart' || e.type=='reset'){
                            fs.ani.stop(currentscroll.bar);
                            fs.style.set(currentscroll.bar, 'opacity', 0.5);
                            if (e.type=='reset'){
                                scrollbar.display({}, 0.5);
                            }
                        }else if (currentscroll.show || isfirst){
                            fs.ani.set(currentscroll.bar, {opacity:0}, {easing:'linear', time:0.2, delay:isfirst});
                        }
                    }
                }
            }
    
            scrollbar.addEventListener('scrollstart', scrollbar.display).addEventListener('scrollend', scrollbar.display);
            if (hideatfirst){
                for (i=0; i<2; i++){
                    currentscroll=scrollbar[(!i)? 'x' : 'y'];
                    if (!currentscroll.disable && !currentscroll.hide){
                        fs.style.set(currentscroll.bar, 'opacity', 0);
                    }
                }
            }else{
                scrollbar.display({type:'scrollstart'});
                scrollbar.display({}, 1);
            }
    
            return scrollbar;
    
        },
    
        //mouse over�� �뚮쭔 track�� 蹂댁씠寃�
        'show-only-over' : function(target, option){
    
            var scrollbar=fs.set(target, option);
            var i, currentscroll, bardowned=false, overed=false, action=function(e, delay){
                overed=e && (e.type=='mouseover' || e.type=='touchstart');
                if (bardowned){
                    return;
                }
                for (i=0; i<2; i++){
                    currentscroll=scrollbar[(!i)? 'x' : 'y'];
                    if (!currentscroll.disable && currentscroll.show){
                        fs.ani.set(currentscroll.track, {opacity:(overed)? 1 : 0}, {easing:'linear', time:0.2, delay:delay});
                    }
                }
                if (scrollbar.neutralzone && scrollbar.neutralzone.offsetWidth){
                    fs.ani.set(scrollbar.neutralzone, {opacity:(overed)? 1 : 0}, {easing:'linear', time:0.2, delay:delay});
                }
            }, bardown=function(){
                bardowned=true;
                fs.event.add(document, 'mouseup', barup, scrollbar.id);
            }, barup=function(){
                bardowned=false;
                if (!overed){
                    action('', 0);
                }
                fs.event.remove(document, 'mouseup', barup, scrollbar.id);
            }
    
            fs.event.add(scrollbar.target, 'mouseover', action);
            fs.event.add(scrollbar.target, 'mouseout', action);
            for (i=0; i<2; i++){
                currentscroll=scrollbar[(!i)? 'x' : 'y'];
                if (!currentscroll.disable && !currentscroll.hide){
                    fs.style.set(currentscroll.track, 'opacity', 1);
                    fs.event.add(currentscroll.bar, 'mousedown', bardown);
                }
            }
            if (scrollbar.neutralzone && scrollbar.neutralzone.offsetWidth){
                fs.style.set(scrollbar.neutralzone, 'opacity', 1);
            }
            action('', 1);
    
            return scrollbar;
    
        },
    
        //slider
        'slider-x' : function(target, option){
            return fs.presetter.slider(target, option, 'x');
        },
        'slider-y' : function(target, option){
            return fs.presetter.slider(target, option, 'y');
        },
    
        //switch
        'switch-x' : function(target, option){
            return fs.presetter['switch'](target, option, 'x');
        },
        'switch-y' : function(target, option){
            return fs.presetter['switch'](target, option, 'y');
        }
    
    }
    
    fs.presetter={
    
        slider : function(target, option, flag){
    
            if (option.barsize==undefined || option.min==undefined || option.max==undefined || option.min==option.max || option.min>option.max){
                return null;
            }
    
            var sizeflag, positionflag;
            if (flag=='x'){
                option.y.disable=true;
                sizeflag='clientWidth';
                positionflag='Left';
            }else{
                option.x.disable=true;
                sizeflag='clientHeight';
                positionflag='Top';
            }
    
            var gap=option.max-option.min, osize=target[sizeflag], size=osize+gap, step=option.step || 1;
            var nowvalue=Math.round(((option.value!=undefined)? option.value : option.min)/step)*step;
            if (option.min>nowvalue){
                nowvalue=option.min;
            }
            option.animate=false;
            option.slidermode=true;
            option.scrollsizefix=step;
    
            var scrollbar=fs.set(target, option, true);
            if (flag=='x'){
                fs.style.set(scrollbar.wrapper, 'width', size);
                fs.style.set(scrollbar.wrapper, 'height', 1);
            }else{
                fs.style.set(scrollbar.wrapper, 'width', 1);
                fs.style.set(scrollbar.wrapper, 'height', size);
            }
            fs.style.set(scrollbar.wrapper, 'opacity', 0);
            scrollbar.reset();
            scrollbar['scroll'+positionflag]((size-osize)*((nowvalue-option.min)/gap), true);
    
            scrollbar.addEventListener('scroll', function(e){
                var value=option.min+(gap*e['scroll'+positionflag]/(size-osize));
                if (nowvalue!=value){
                    option.onchange && option.onchange(value);
                    nowvalue=value;
                }
            });
            var bardown=false, setposition=function(){
                if (bardown){
                    fs.autoscroll(scrollbar, flag, scrollbar[flag].bar['offset'+positionflag], true);
                    bardown=false;
                }
                fs.event.remove(document, 'mouseup', setposition, scrollbar.id);
            };
            fs.event.add(scrollbar[flag].bar, 'mousedown', function(){
                bardown=true;
                fs.event.add(document, 'mouseup', setposition, scrollbar.id);
            });
    
            return scrollbar;
    
        },
    
        'switch' : function(target, option, flag){
    
            if (option.barsize==undefined){
                return null;
            }
    
            option.min=0;
            option.max=target[(flag=='x')? 'clientWidth' : 'clientHeight'];
            option.step=option.max;
            option.value=(option.value)? option.step : 0;
            var changed, onchange=option.onchange;
            option.onchange=function(value){
                option.value=value;
                onchange && onchange((option.value)? true : false);
                changed=true;
            }
            var scrollbar=fs.presetter.slider(target, option, flag);
            var toggle=function(){
                if (!changed){
                    setTimeout(function(){//ie6 bug?
                        scrollbar[(flag=='x')? 'scrollLeft' : 'scrollTop']((option.value)? 0 : option.step);
                    }, 0);
                }
                fs.event.remove(document, 'mousemove', move, scrollbar.id);
                fs.event.remove(document, 'mouseup', toggle, scrollbar.id);
            }
            var mouseposition;
            var reset=function(e){
                changed=false;
                mouseposition=fs.handle.getpoint(e);
                fs.event.add(document, 'mousemove', move, scrollbar.id);
                fs.event.add(document, 'mouseup', toggle, scrollbar.id);
            }
            var move=function(e){
                var nowmouseposition=fs.handle.getpoint(e);
                if (mouseposition[0]!=nowmouseposition[0] || mouseposition[1]!=nowmouseposition[1]){
                    changed=true;
                }
            }
            fs.event.add(scrollbar[flag].bar, 'mousedown', reset);
            fs.event.add(scrollbar[flag].track, 'mousedown', reset);
    
            return scrollbar;
    
        }
    
    }
    
    
    return fs;}();