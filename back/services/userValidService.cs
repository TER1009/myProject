using back.interfaces;
using back.DTO;
using Microsoft.AspNetCore.Mvc;

namespace back.services
{
    public class userService : iUserService
    {
        public bool isValidDataUser(clientDTO user)
        {
            int count;
            if (user.nickname != user.password && user.password.Length >= 1)
            {
                for (int i = 0; i < user.password.Length; i++)
                {
                    count = 0;
                    for (int j = 0; j < user.password.Length; j++)
                    {
                        if (user.password[i] == user.password[j])
                        {
                            count++;
                            if (count >= 2) return false;
                        }
                    }
                }
            }
            else return false;
            return true;
        }
    }
}