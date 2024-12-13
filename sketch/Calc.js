function ApproachNumber(factor, target, modifier){

    /*
        Factor = 116, Target = 100, Modifier = 20 => sign = -1, Modifier = -20, 100
        Factor = 116, Target = 136, Modifier = 10 => 126
        Factor = 116, Target = 0, Modifier = 36 => 80
        Factor -116, Target = -136, Modifier 10 => -136
        Factor = -5, Target = 2, Modifier = 3 => sign = +1, 
    */
    //If target > factor => +1
    //If target < factor => -1
    //If target == factor => 0
    let sign = Math.sign(target - factor);
    //If we're increasing towards a number
    if(modifier * sign > 0){
        if(factor + (modifier * sign) > target)
            return target;
        else
            return lerp(factor, target, modifier/Math.abs(factor-target));
    }
    else if(modifier * sign < 0){
        if(factor + (modifier * sign) < target)
            return target;
        else
            return lerp(factor, target, modifier/Math.abs(factor-target));
    }
    else{
        return target;
    }
}