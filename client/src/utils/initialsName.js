export const initials = (name) => {
  // get initial from first and last name
  const parts = name.trim().split(/\s+/);
  const firstName = parts[0]?.[0] || "";
  const lastName = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (firstName + lastName).toUpperCase();
};
