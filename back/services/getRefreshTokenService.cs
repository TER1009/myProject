using System;
using System.Security.Cryptography;

namespace back.services
{
    public class RefreshToken
    {
        public static string get()
        {
            var key = new Byte[32];
            using (var refreshTokenGenerator = RandomNumberGenerator.Create())
            {
                refreshTokenGenerator.GetBytes(key);
                return Convert.ToBase64String(key);
            }
        }
    }
}