class Github {
   constructor () {
       this.client_id = '296b2f31151facbb8c6c';
       this.cleint_secret = 'a49622706961e323dfde646becb897c7af642b77'
   }

   async getUser (user) {
       const profileResponse = await fetch(`https://api.github.com/users/${user}?cliebt_id=${this.client_id}&client_secret=${this.cleint_secret}`);

       const profile = await profileResponse.json();

       return {
           profile
       }
   }
}