using System.Globalization;
using back.models;
using System.Collections.Generic;
using System;
using back.db;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using back.DTO;

namespace back.repository
{
    public class userRepository : iBaseRepository<client>
    {
        private dbContextFWebsite dbContext;
        public userRepository()
        {
            dbContext = new dbContextFWebsite();
        }
        public void create(client client)
        {
            dbContext.Users.Add(client);
            dbContext.SaveChanges();
        }
        public void updute(client client)
        {
            dbContext.Users.Update(client);
            dbContext.SaveChanges();
        }
        public List<client> getaAll()
        {
            return dbContext.Users.ToList();
        }

        public client getById(Guid id)
        {
            var result = new client();
            var list = dbContext.Users.ToList();
            foreach (var user in list)
                if (user.id == id)
                {
                    result = user;
                    break;
                };
            return result;
        }

        public client getById(string tokenRefresh)
        {
            var result = new client();
            var list = dbContext.Users.ToList();
            foreach (var user in list)
                if (user.tokenRefresh == tokenRefresh)
                {
                    result = user;
                    break;
                };
            return result;
        }
        public void delete(client client)
        {
            dbContext.Users.Remove(client);
            dbContext.SaveChanges();

        }
    }
}