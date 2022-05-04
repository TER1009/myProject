using back.models;
using System.Collections.Generic;
using System;
using back.db;
using System.Linq;
using back.interfaces;


namespace back.repository
{
    public class userRepository : iBaseRepository<user>
    {

        private dbContextFWebsite dbContext;
        public userRepository()
        {
            dbContext = new dbContextFWebsite();
        }
        public void create(user client)
        {
            dbContext.Users.Add(client);
            dbContext.SaveChanges();
        }
        public void update(user client)
        {
            dbContext.Users.Update(client);
            dbContext.SaveChanges();
        }
        public List<user> getAll()
        {
            return dbContext.Users.ToList();
        }


        public user getById(Guid id)
        {
            var list = getAll();
            foreach (var user in list)
            {
                if (user.id == id)
                {
                    return user;
                }
            }
            return null;
        }

        public user getById(string token)
        {
            var result = new user();
            var list = dbContext.Users.ToList();
            foreach (var user in list)
            {
                if (string.Equals(token, user.token))
                {
                    Console.WriteLine(user.nickname);
                    return user;
                }
            }
            return null;
        }
        public void delete(user client)
        {
            dbContext.Users.Remove(client);
            dbContext.SaveChanges();

        }
    }
}