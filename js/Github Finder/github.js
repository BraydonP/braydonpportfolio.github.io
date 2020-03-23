class Github {
   constructor () {
       this.client_id = '296b2f31151facbb8c6c';
       this.cleint_secret = 'a49622706961e323dfde646becb897c7af642b77'
       this.repos_count = 5;
       this.repos_sort = "created: asc";
     }
   
     async getUser(user) {
       const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
   
       const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
   
       const profile = await profileResponse.json();
       const repos = await repoResponse.json();
   
       return {
         profile,
         repos
         // the same as:
         //                profile: profile
         //                repos: repos
       }
     }
   }
