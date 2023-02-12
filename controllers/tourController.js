const fs=require('fs');
const tours=JSON.parse(fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`)
);

exports.checkId=(req,res,next,val)=>{
    console.log(`Tour id is :${val}`)
    if(req.params.id*1>tours.length)
    {
        return res.status(404).json({
            status:'fail',
            message:'Invalid Id'
        })
    }
    next();
}

exports.checkBody=(req,res,next)=>{
    if(!req.body.name || !req.body.price)
    {
        res.status(404).json({
            status:'fail',
            message:'Missing name or price'
        })
    }
    next();
}



//All tour get
exports.getTours= (req,res)=>{
    console.log(req.requestTime)
    res.status(200).json({
    status:'success',
    requestedAt:req.requestTime,
    results:tours.length,
    data:{
        tours
    }
    });
    }


//Get single tour

exports.getTour=  (req,res)=>{
    // console.log(req.params)
    const id=req.params.id*1;  //string to number
    
    const tour=tours.find(el=>el.id===id );
  
    
    res.status(200).json({
    status:'success',
    results:tours.length,
    data:{
        tour
    }
    });
    }  

 //Create Tour

 exports.createTour=(req,res)=>{
    // console.log(req.body);
    const newId=tours[tours.length-1].id+1;
    // console.log(newId)
    const newTour=Object.assign({id:newId},req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json(
            {
                status:'success',
                data :{
                    tour:newTour
                }
            }
        )
     })
    
    }

//Update Tour
exports.updateTour=  (req,res)=>{

    res.status(200).json({
        status:'success',
        data:{
            tour:'<Updated Tour>'
        }
    })
}  

 ///Delete tour

 exports.deleteTour=(req,res)=>{
   
    res.status(204).json({
        status:'success',
        data:{
           data:null
        }
    })
}