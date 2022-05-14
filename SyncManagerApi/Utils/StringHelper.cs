namespace SyncManagerApi.Utils;

public static class StringHelper
{
    public static bool IsUrlPrefix(string keyword)
    {
        var prefixList = new List<string>() { "https://www", "http://www" };
        foreach (var prefix in prefixList)
        {
            if (prefix.Contains(keyword))
            {
                return true;
            }
        }
        return false;
    }
}