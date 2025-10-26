import { supabase } from "../client";
import type { TNotificationTable } from "../types";

export const getNotifications = async (): Promise<TNotificationTable[]> => {
  try {
    const { data, error } = await supabase.from("notifications").select("*");

    if (error) {
      console.error("Failed to fetch notifications:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
    return [];
  }
};

type TNotifyData = {
  user_id: string;
  user_name: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
};
export const createNotification = async (
  notifyData: TNotifyData
): Promise<TNotificationTable> => {
  try {
    const { user_id, user_name, title, message, type, is_read } = notifyData;

    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id,
        user_name,
        title,
        message,
        type,
        is_read,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to insert a notification:", error.message);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Failed to insert a notification:", err);
    throw err;
  }
};

export const updateNotification = async (
  is_read: boolean,
  user_id: string
): Promise<TNotificationTable> => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read })
      .eq("user_id", user_id)
      .single();

    if (error) {
      console.error("Failed to update the notification:", error.message);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Failed to update the notification:", err);
    throw err;
  }
};

export const deleteNotifications = async () => {
  try {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .neq("id", "");

    if (error) {
      console.error("Failed to clear notifications:", error.message);
    }
  } catch (err) {
    console.error("Failed to clear the notifications:", err);
    throw err;
  }
};
