class NODE
{
    constructor(r)
    {
        this.v = r;
        this.NEXT=null;
        this.BACK=null;
    }
    set_back(d){this.BACK = d;}
    set_next(d){this.NEXT = d;}
    set_value(d){this.v = d;}
    get_back(){return this.BACK;}
    get_next(){return this.NEXT;}
    get_value(){return this.v;}
}


class LIST
{
    constructor(){
        this.BEGIN=null;
        this.END = null;
        this.size=0;
    }

    flow()
    {
        document.getElementById("bucket").innerHTML= "";
        var toAdd = document.createDocumentFragment("container");
        let aux = this.BEGIN;
        let text = "";
        let g=1;
        let b=1;
        let n=1;
        while(aux!=null)
        {     
            var newDiv = document.createElement('t1');
            newDiv.id = "R"+g;
            if(b==1)
            {
                b=0;
                newDiv.className = "SR";
            }
            else{newDiv.className = "SG";}
            newDiv.textContent = aux.get_value();

            var context = document.createElement('div');

            context.appendChild(newDiv);
            context.style.position = "absolute";
            context.style.left = n*50+'px';n++;
            toAdd.appendChild(context);
            aux = aux.get_next();
        }
        document.getElementById("bucket").appendChild(toAdd);
    }

    add(e)
    {
        if(this.BEGIN==null)
            {this.BEGIN = this.END = new NODE(e);}
        else
            {this._add(this.BEGIN,e);}
        this.size = this.size+1;
        this.sort();
        this.flow();        
    }
    _add(N,e)
    {
        if(N.get_next()==null)
            {N.set_next(new NODE(e));
            this.END = N.get_next();
            N.get_next().set_back(N);
        }
        else
            {this._add(N.get_next(),e);}
    }

    get_n(n)
    {
        let c=0;
        let AUX=this.BEGIN;
        while(c<n)
        {
            AUX = AUX.get_next();
            c++;
        }
        return AUX;
    }

    clear_()
    {
        for(let i = 0;i<this.size;++i)
        {
            console.log("deleting "+this.get_n(i).get_value());
            delete this.get_n(i);

        }
        this.size = 0;
        this.ROOT = null;
        this.END = null;
        console.log("size is : "+this.size);
    }
    
    sort()
    {
        let A = this.BEGIN;
        let B = this.BEGIN;
        for(let r=0;r<(this.size);r++)
        {
            let A = this.get_n(r);
            let B = this.get_n(r);

            while(A.get_next() != null)
            {
                A = A.get_next();
                if(parseInt(A.get_value(),10)<parseInt(B.get_value(),10))
                { B = A;}
            }
            A = this.get_n(r);
            let g= A.get_value();
            A.set_value(B.get_value());
            B.set_value(g);
        }
    }
}

class TNODE
{

    constructor(r)
    {
        this.v = r;
        this.HD = null;
        this.HI = null;
        this.x = null;
        this.y = null;
        this.i = 0;
    }
}

class TREE
{
    constructor()
    {
        this.ROOT = null;
        this.size = 0;
        this.order = 0;
        this.s = true;
    }

    get_root = function(TNODE){return this.ROOT;}

    add1_(N,e)
    {
        if(parseInt(N.v,10)>parseInt(e,10))
        {
            if(N.HI == null)
                N.HI = new TNODE(e);
            else
                this.add1_(N.HI,e);    
        }
        else{
            if(N.HD == null)
                N.HD = new TNODE(e);
            else
                this.add1_(N.HD,e);    
        }
    }

    add1(e)
    {
        if(this.ROOT == null)
            this.ROOT = new TNODE(e);
        else 
            this.add1_(this.ROOT,e);
        this.size++;
        console.clear();
        this.order = 1;
        this.setpos(this.ROOT,1);
        this.order = 1;   
        this.flow(); 
    }

    setpos(M, n)
    {
        if(M.HI != null)
            this.setpos(M.HI, n+1);
        
            M.x = this.order*50;this.order++;
            M.y = n*50;
        
        if(M.HD!= null)
            this.setpos(M.HD, n+1);
    }

    flow_(M, BUCKET, canvas1, n)
    {
        if(M.HD != null)
        {         
           canvas1.beginPath();
           canvas1.moveTo(M.x,M.y);
           canvas1.lineTo(M.HD.x,M.HD.y);
           canvas1.stroke();
        }


        if(M.HI != null)
        {
           canvas1.beginPath();
           canvas1.moveTo(M.x,M.y);
           canvas1.lineTo(M.HI.x,M.HI.y);
           canvas1.stroke();
        }

          if(M.HD != null)
            this.flow_(M.HD, BUCKET, canvas1, n+1);

            var newDiv = document.createElement('t1');
            newDiv.id = "R"+n;
            if(M == this.ROOT)
            {
                newDiv.className = "SR";
            }
            else{newDiv.className = "SG";}
            newDiv.textContent = M.v;
            var context = document.createElement('div');
            context.appendChild(newDiv);
            context.style.position = "absolute";
            console.log("element : "+M.v+" px : "+M.x+" py: "+M.y);
            context.style.top = M.y+'px';
            context.style.left = M.x+'px';
            BUCKET.appendChild(context);
        if(M.HI!= null)
            this.flow_(M.HI, BUCKET, canvas1, n+1);         
    }


    flow()
    {
        document.getElementById("bucket2").innerHTML= "";
        var toAdd = document.createDocumentFragment("container");
        var cv = document.getElementById("cv1");
        //cv.style.marginLeft = document.getElementById("bucket2").style.marginLeft;
        //cv.style.marginTop = document.getElementById("bucket2").style.marginTop;
        cv.style.marginLeft = document.getElementById("td_main_Table");
        cv.style.marginLeft = 230+"px";
        cv.style.marginTop = 30+"px";
        cv.style.width = window.innerWidth;
        cv.style.height = window.innerHeight;
        var context = cv.getContext("2d");
        context.clearRect(0, 0, cv.width, cv.height);
        context.strokeStyle = '#808000';
        this.flow_(this.get_root(), toAdd, cv.getContext("2d"), 1);
        document.getElementById("bucket2").appendChild(toAdd);

    }

//====================================================
    
    r_find(N, i)
    {
        
        if(N.i == i)
        {
            console.log("r_find retorna "+N.v);
            return N;
        }
        else
        {
            if(this.projection(N,i)==1)
            {
                return this.r_find(N.HI,i);
            }
            else 
                return this.r_find(N.HD,i); 
        }
    }

    at(i)
    {
        console.log("at i : "+i);
        return this.r_find(this.ROOT, i);
    }

    projection(N, aux)
    {
        console.log("proyection");
        console.log("N : "+N.i);
        console.log("aux : "+aux);

        if(N.HD!= null && N.HI != null)
        {
            while(N.HD.i != aux && N.HI.i != aux)
                aux = Math.trunc(aux/2);        
            if(N.HI.i == aux)
                return 1;
            else
                return 0;  
        }
        else
        {
            return 1;  
        }
               
    }

    heapify_(N)
    {
        if(N != null)//45
        {
            console.log("Entering to heapify of : "+N.v);
            let AUX = this.at(N.i);
            console.log("AUX is "+AUX.v);

            while(AUX!=this.ROOT)
            {
                let PARENT = this.at(Math.trunc(AUX.i/2))
                console.log("Parent : "+PARENT.v);
                console.log("N.i : "+AUX.i);
                console.log("Parent of "+AUX.i+" is "+PARENT.i);

                if(this.s == true)
                {
                    if(parseInt(PARENT.v,10) < parseInt(AUX.v, 10))
                    {
                        console.log("change between "+PARENT.v+" , "+AUX.v);
                        let g = this.at(PARENT.i).v;
                        this.at(PARENT.i).v = this.at(AUX.i).v;
                        this.at(AUX.i).v = g;
                    }
                }
                else
                {
                    if(parseInt(PARENT.v,10) > parseInt(AUX.v, 10))
                    {
                        console.log("change between "+PARENT.v+" , "+AUX.v);
                        let g = this.at(PARENT.i).v;
                        this.at(PARENT.i).v = this.at(AUX.i).v;
                        this.at(AUX.i).v = g;
                    }
                }                              
                AUX = this.at(PARENT.i);
                console.log("AUX ahora es : "+AUX.v);
            }
        }
    }

    all_heapify(N)
    {
        if(N != null)
        {
            this.all_heapify(N.HI);
            this.heapify_(N);            
            this.all_heapify(N.HD);           
       }
    } 

    add2(e)
    {
        if(this.ROOT == null)
        {
            this.size++;
            this.ROOT = new TNODE(e);
            this.ROOT.i = this.size;
            console.log("root i is : "+this.ROOT.i);
        }
        else if(this.ROOT.HI == null)
        {
            this.ROOT.HI = new TNODE(e);
            this.ROOT.HI.i = this.size;   
        }
        else if(this.ROOT.HD == null)
        {
            this.ROOT.HD = new TNODE(e);
            this.ROOT.HD.i = this.size;
        }
        else
        {
            let aux = this.ROOT;
            while(aux.HD != null && aux.HI != null)
            {
                let floyd = this.projection(aux, this.size);
                if(floyd==1)
                    aux = aux.HI;
                else
                    aux = aux.HD;
            }

            if(aux.HI == null)
            {
                aux.HI = new TNODE(e);
                aux.HI.i = this.size;
            }
            else
            {
                aux.HD = new TNODE(e);
                aux.HD.i = this.size;
            }
        }   
        this.size++;
        this.order = 1;
        this.setpos(this.ROOT,1);   
        this.all_heapify(this.ROOT);
        this.flow2();
    }

    flow2_(M, BUCKET, canvas1, n)
    {
        
        if(M.HD != null)
        {         
           canvas1.beginPath();
           canvas1.moveTo(M.x,M.y);
           canvas1.lineTo(M.HD.x,M.HD.y);
           canvas1.stroke();
        }


        if(M.HI != null)
        {
           canvas1.beginPath();
           canvas1.moveTo(M.x,M.y);
           canvas1.lineTo(M.HI.x,M.HI.y);
           canvas1.stroke();
        }
        
        if(M.HI != null)
            this.flow2_(M.HI, BUCKET, canvas1, n+1);

            var newDiv = document.createElement('t1');
            newDiv.id = "R"+n;
            if(M == this.ROOT)
            {
                newDiv.className = "SR";
            }
            else{newDiv.className = "SG";}
            newDiv.textContent = M.v+"   "+M.i;

            var context = document.createElement('div');
            context.appendChild(newDiv);
            context.style.position = "absolute";
            context.style.top = M.y+'px';
            context.style.left = M.x+'px';
            BUCKET.appendChild(context);

        if(M.HD!= null)
            this.flow2_(M.HD, BUCKET, canvas1, n+1);         
    }
   
    flow2()
    {
        document.getElementById("bucket2").innerHTML= "";
        var toAdd = document.createDocumentFragment("container");
        var cv = document.getElementById("cv1");
        cv.style.width = window.innerWidth;
        cv.style.height = window.innerHeight;
        var context = cv.getContext("2d");
        context.clearRect(0, 0, cv.width, cv.height);
        context.strokeStyle = '#808000';
        if(this.ROOT != null)
            this.flow2_(this.get_root(), toAdd, context, 1);
        document.getElementById("bucket2").appendChild(toAdd);

    }

//================================================================

    


    get_height(N)
    {
        if(N != null)
        {
            let hi = 1+this.get_height(N.HI);
            let hd = 1+this.get_height(N.HD);

            if(hd>hi)
                return hd;
            else
                return hi;    
        }
        else
            return 0;
    }

    l_turn(N)
    {
       let M = N.HD;
       N.HD = M.HI;
       M.HI = N;
       return M;
    }

    r_turn(N)
    {
       let M = N.HI;
       N.HI = M.HD;
       M.HD = N;
       return M;
    }

    balance(N)
    {
        if(N != null)
        {
            let bhi = this.get_height(N.HI);
            let bhd = this.get_height(N.HD);

            let f_e = bhd-bhi;
            if(f_e>1)
                N = this.l_turn(N);
            if(f_e<-1)
                N = this.r_turn(N);    
        }
        return N;
    }

    all_balance(N)
    {
        if(N!=null)
        {
            N = this.balance(N);
            N.HI = this.all_balance(N.HI);
            N.HD = this.all_balance(N.HD);
        }
        return N;
    }

    r_fvalue(N, v)
    {
        if(N.v == v)
            return N;
        else if(N.v>v)
            return this.r_fvalue(N.HI,v);
        else if(N.v<v)
            return this.r_fvalue(N.HD,v);        
    }

    find_by_value(v)
    {
        return r_fvalue(this.ROOT, v);
    }


    add3_(N,e)
    {
        if(parseInt(N.v,10) < parseInt(e,10))
        {
            if(N.HD == null)
                N.HD = new TNODE(e)
            else
                this.add3_(N.HD, e);     
        }
        else
        {
            if(N.HI == null)
                N.HI = new TNODE(e);
            else
                this.add3_(N.HI, e);    
        }
    }

    add3(e)
    {
        if(this.ROOT == null)
        {
            this.ROOT = new TNODE(e);
        }
        else
            this.add3_(this.ROOT,e);

        this.size++;
        this.ROOT = this.all_balance(this.ROOT);
        this.order = 1;
        this.setpos(this.ROOT,1);
        this.order = 1;   
        this.flow();   
    }
}

function change_opt() {
    var cv = document.getElementById("cv1");
    var context = cv.getContext("2d");
    context.clearRect(0, 0, cv.width, cv.height);
    document.getElementById("bucket").innerHTML = "";
    document.getElementById("bucket2").innerHTML= "";
    document.getElementById("input_number").value = "";
    list = new LIST(); tree = new TREE();
}


window.onload=()=>{

    let list = new LIST();
    let tree = new TREE();
    let key = 1;

    document.getElementById("button_agregar").addEventListener("click",()=>{
        
        var number = document.getElementById("input_number").value;
        if(number != "")
        {
            switch (key) {
                case 1:
                    list.add(number);
                    break;
                case 2:
                    tree.add1(number);
                    break;
                case 3:
                    tree.add2(number);
                    break;
                case 4:
                    tree.add3(number);    
                    break;
                default:
                    break;
            }

            document.getElementById("input_number").value = "";
        }
    });

    document.getElementById("linked_list").addEventListener("click",()=>{
        var cv = document.getElementById("cv1");
        var context = cv.getContext("2d");
        context.clearRect(0, 0, cv.width, cv.height);
        document.getElementById("bucket").innerHTML = "";
        document.getElementById("bucket2").innerHTML= "";
        document.getElementById("input_number").value = "";
        list = new LIST(); tree = new TREE();
        document.getElementById("heap_flow").style.visibility = "hidden";
        key = 1; 
    });

    document.getElementById("binary_tree").addEventListener("click",()=>{
        var cv = document.getElementById("cv1");
        var context = cv.getContext("2d");
        context.clearRect(0, 0, cv.width, cv.height);
        document.getElementById("bucket").innerHTML = "";
        document.getElementById("bucket2").innerHTML= "";
        document.getElementById("input_number").value = "";
        list = new LIST(); tree = new TREE();
        document.getElementById("heap_flow").style.visibility = "hidden";
        key = 2; 
    });

    document.getElementById("heap_binary_tree").addEventListener("click",()=>{
        var cv = document.getElementById("cv1");
        var context = cv.getContext("2d");
        context.clearRect(0, 0, cv.width, cv.height);
        document.getElementById("bucket").innerHTML = "";
        document.getElementById("bucket2").innerHTML= "";
        document.getElementById("input_number").value = "";
        list = new LIST(); tree = new TREE();
        document.getElementById("heap_flow").style.visibility = "visible";
        key = 3; 
    });

    document.getElementById("avl_tree").addEventListener("click",()=>{
        var cv = document.getElementById("cv1");
        var context = cv.getContext("2d");
        context.clearRect(0, 0, cv.width, cv.height);
        document.getElementById("bucket").innerHTML = "";
        document.getElementById("bucket2").innerHTML= "";
        document.getElementById("input_number").value = "";
        list = new LIST(); tree = new TREE();
        document.getElementById("heap_flow").style.visibility = "hidden";     
        key = 4; 
    });

    document.getElementById("heap_flow").addEventListener("click",()=>{
        if(document.getElementById("heap_flow").firstChild.data == "Min Binaty Heap")
        {
            document.getElementById("heap_flow").firstChild.data = "Max Binaty Heap";
            tree.s = true;
        }
        else
        {
            document.getElementById("heap_flow").firstChild.data = "Min Binaty Heap";
            tree.s = false;
        }
        tree.all_heapify(tree.ROOT);
        tree.flow2();
    });
}