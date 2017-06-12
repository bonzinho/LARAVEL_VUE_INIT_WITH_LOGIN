<template>
    Dashboard
</template>

<script type="text/javascript">

    import Auth from '../services/auth';
    import {User} from '../services/resources';

    export default{
        ready(){
            User.get().then((response) => {
               console.log(response.data);
            });
        }
    }
</script>
